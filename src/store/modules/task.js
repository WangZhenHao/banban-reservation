import { runTask, toReversion } from '@src/views/home/js/runTask';

const state = {
    tasksList: [],
    currentTask: {},
    taskTips: ''
}

const mutations = {
    showTaskTips(state, info) {
        state.taskTips = info;
    },
    addTask(state, info) {
        if(Array.isArray(info)) {
            state.tasksList = info;
        } else {
            state.tasksList.push(info);
        }
        tools.setLocalStorage('tasksList', state.tasksList)
    },
    delTask(state, info) {
        const list = state.tasksList;
        
        const index = list.findIndex(item => item.id === info.id)
        state.tasksList.splice(index, 1);

        tools.setLocalStorage('tasksList', list)

    },
    editTask(state, info) {
        const list = JSON.parse(JSON.stringify(state.tasksList));

        for(let i = 0; i < list.length; i++) {
            if(list[i].id === info.id) {
                list[i] = info;
                break;
            }
        }

        state.tasksList = list
        tools.setLocalStorage('tasksList', list)
    },
    chageCurrentTask(state, info) {
        state.currentTask = info || {};
        tools.setLocalStorage('currentTask', info)
    },
    // delCurrentTask(state) {
    //     state.currentTask = {}
    //     tools.setLocalStorage('currentTask', {})
    // }
}

const actions = {
    initTask(context) {
        const task = context.state.currentTask;

        if(task.id && task.resource === 1) {
            context.dispatch('runTask', task);
        }
    },
    runTask(context, info) {
        return new Promise((resolve, reject) => {
            info.taskStatus = 1;
            info.requestTwice = 0;

            context.commit('chageCurrentTask', info);
            context.commit('editTask', info)
            context.dispatch('startTask');

            resolve(info)
        })
        
    },
    startTask(context) {
        const task = context.state.currentTask;

        const taskInfo = runTask(task);
        if (taskInfo) {
            toReversion(taskInfo);
            clearTimeout(taskInfo.timer);
        } else {
            task.timer = setTimeout(() => {
                context.dispatch('startTask');
            }, 2000);
        }
    },
    stopTask(context) {
        return new Promise((resolve, reject) => {
            const task = context.state.currentTask;
        
            if(task.timer) {
                task.taskStatus = 0;
                clearTimeout(task.timer)

                context.commit('editTask', task)
                context.commit('chageCurrentTask', {});
                context.commit('showTaskTips', '');
            }

            resolve();
        })
        
    }
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}