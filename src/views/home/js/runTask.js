import { timestampToDate, dateToTimestamp } from '@js/utils/utils'
import { addReversion, getPlanInfo } from '@api/home.js'
import store from '@src/store'
import { MessageBox } from 'element-ui';

function runTask(item) {
    if(!item.id) return;

    var crurrentStamp = +new Date();
    
    item.requestTwice++;
    crurrentStamp += 60 * 60 * 24 * 1000;

    if(item.resource === 1) {
        item.date = timestampToDate('yyyy-MM-DD', crurrentStamp);
    } 
    
    var startTimeStamp = dateToTimestamp(item.date + ' ' + item.robTime[0])
    var endTimeStamp = dateToTimestamp(item.date + ' ' + item.robTime[1])

    if(crurrentStamp > endTimeStamp) {
        let tips = `任务: ${item.name}，已结束。`
        store.dispatch('task/stopTask')
        MessageBox.alert(tips, '提示').then(() => {
            store.commit('task/showTaskTips', tips)
        })
        
    }

    let tips = `任务: ${item.name} ${item.date} ${item.time.join('~')}, 等待任务命中:${item.requestTwice}次,开抢时间：${item.robTime.join('至')}; 执行时间：${timestampToDate('yyyy-MM-DD hh:mm:ss', +new Date())}`
    store.commit('task/showTaskTips', tips)
    console.log(tips);

    if(crurrentStamp > startTimeStamp && crurrentStamp < endTimeStamp) {
        let tips = `任务命中; 执行时间：${timestampToDate('yyyy-MM-DD hh:mm:ss', +new Date())}`;
        store.commit('task/showTaskTips', tips)
        console.info(tips, item);
        return item;
    }
}

function toReversion(taskInfo) {
    taskInfo.requestTwice = 1
    _toReversion(taskInfo);
}

async function _toReversion(taskInfo) {
    const userInfo = store.state.userInfo;
    const coachInfo = store.state.coachInfo;

    try {
        let tips = `任务: ${taskInfo.name} ${taskInfo.date} ${taskInfo.time.join('~')}, 接口请求:${taskInfo.requestTwice}次; 执行时间：${timestampToDate('yyyy-MM-DD hh:mm:ss', +new Date())}`;
        store.commit('task/showTaskTips', tips)
        console.warn(tips);

        const planInfo = await getPlanInfo({
            companyID: userInfo.student.schoolThirdpartyId,
            coachID: coachInfo.coachId,
            planDate: taskInfo.date,
            stuID: userInfo.student.thirdpartyId,
            carType: userInfo.student.modelCar,
            subjectId: userInfo.student.learnDriverProgress,
        });

        const list = planInfo.result;
        
        if(list && list.length) {
            const taskStartStamp = dateToTimestamp(taskInfo.date + ' ' + taskInfo.time[0])
            const taskEndStamp = dateToTimestamp(taskInfo.date + '  ' + taskInfo.time[1])

            for(var item of list) {
                const itemStartStamp = dateToTimestamp(taskInfo.date + ' ' + item.startTime);
                const itemEndStamp = dateToTimestamp(taskInfo.date + ' ' + item.endTime);

                if(taskStartStamp === itemStartStamp && taskEndStamp === itemEndStamp) {
                    reversionPlan(item)
                    return;
                }
            }

            MessageBox({
                title: '消息',
                dangerouslyUseHTMLString: true,
                message: `<p>没有匹配到${taskInfo.date}的排课</p>
                <p>您要自动预约的是${taskInfo.date} ${taskInfo.time.join('至')}时间段的排班</p>`,
                confirmButtonText: '确定',
            }).then(res => {
                store.commit('task/showTaskTips', `没有匹配到${taskInfo.date}的排课`)
            })
        } else {
            var crurrentStamp = +new Date();
            var crurrentDate = timestampToDate('yyyy-MM-DD', crurrentStamp) + ' ' + taskInfo.robTime[1];
            var endTimeStamp = dateToTimestamp(crurrentDate);

            if(crurrentStamp > endTimeStamp) {
                let tips = '本次接口请求任务结束，任务失败: 开抢时间已结束';
                store.commit('task/showTaskTips', tips)
                console.log(tips);
                clearTimeout(taskInfo.timer);

                MessageBox.alert(tips, '提示').then(() => {
                    store.commit('task/initTask')
                })
            } else {
                taskInfo.requestTwice++
                taskInfo.timer = setTimeout(() => {
                    _toReversion(taskInfo)
                }, 2000)
            }
            
        }

    }catch(e) {
        console.error(e)
    }
}

function reversionPlan(item) {
    const userInfo = store.state.userInfo;
    const coachInfo = store.state.coachInfo;
    const planId = String(item.planId)
    addReversion({
        companyID: userInfo.student.schoolThirdpartyId,
        coachID: coachInfo.coachId,
        planId,
        stuId: userInfo.student.thirdpartyId,
        reservationPeople: userInfo.student.studentType
    }).then(res => {
        let tips = res.result.remark
        // if(res.code === 1) {
        //     msg
        // } else {

        // }
        store.dispatch('task/stopTask')
        store.commit('task/showTaskTips', tips)
        MessageBox({
            title: '消息',
            dangerouslyUseHTMLString: true,
            message: `${tips}`,
            confirmButtonText: '确定',
        }).then(() => {
            // store.dispatch('task/initTask')
        })
        
    }).catch((res) => {
        let tips = '服务器错误，请联系管路员！';
        
        store.commit('task/showTaskTips', tips)
        MessageBox({
            title: '错误',
            message: `<h1>${tips}</h1>`,
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
        })
    })
}

export {
    runTask,
    toReversion,
    reversionPlan
}