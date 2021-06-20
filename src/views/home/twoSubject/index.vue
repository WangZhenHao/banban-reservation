<template>
    <div class="container">
        <nav-wrap></nav-wrap>
        
    </div>
</template>
<script>
import navWrap from './components/header';
import addTask from './components/addTask.vue';
import showTask from './components/showTask.vue';
import coachDetail from './components/coachDetail.vue';
import studyList from './components/studyList.vue';

import { getPlanInfo } from '@api/home';
import { getCurrentFiveDate, getPreviuosFiveDate, getNextFiveDate } from './js/calender';
import { reversionPlan } from './js/runTask';

export default {
    components: {
        navWrap,
        addTask,
        showTask,
        coachDetail,
        studyList,
    },
    data() {
        return {
            dateList: [],
            selectDate: {},
            planList: [],
            loadding: false,
        };
    },
    mounted() {
        this.init();
        this.$store.dispatch('task/initTask')
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        },
        coachInfo() {
            return this.$store.state.coachInfo;
        },
        
    },
    methods: {
        init() {
            this.dateList = getCurrentFiveDate();
            this.selectDate = this.dateList[0];

            this.getPlanInfo(this.selectDate.date);
        },
        datePreHandle() {
            this.dateList = getPreviuosFiveDate(this.dateList[0].stamp);
            
        },
        dateNextHandle() {
            this.dateList = getNextFiveDate(this.dateList[this.dateList.length - 1].stamp)
        },
        showStudyListHandle() {
            this.$refs['studyList'].init();
        },
        comfirmTaskHandle(item) {
            this.taskList.push(item);
        },
        addTaskHandle(info) {
            this.$refs['addTask'].init(info);
        },
        resetDateHandle() {
            this.init();
        },
        filterTime(time) {
            if (time) {
                var arr = time.split(':');
                return arr.slice(0, 2).join(':');
            }

            return '';
        },
        selectDateHandle(item) {
            this.selectDate = item;
            this.getPlanInfo(this.selectDate.date);
        },
        reversionPlan(item) {
            reversionPlan(item);
        },
        getPlanInfo(planDate) {
            this.loadding = true;
            this.planList = [];
            getPlanInfo({
                companyID: this.userInfo.student.schoolThirdpartyId,
                coachID: this.coachInfo.coachId,
                planDate,
                stuID: this.userInfo.student.thirdpartyId,
                carType: this.userInfo.student.modelCar,
                subjectId: this.userInfo.student.learnDriverProgress,
            })
                .then((res) => {
                    this.loadding = false;
                    this.planList = res.result;
                })
                .catch(() => {
                    this.loadding = false;
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.container {
    width: 1024px;
    margin: 0 auto;
}
.coach-wrap {
    height: 80px;
    background: #eee;
    border: 1px solid #dedede;
}
.date-wrap {
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    .date-desc {
        width: 130px;
        // height: 400px;
        height: 380px;
        background: #eee;
        user-select: none;
    }
    .date-context {
        height: 380px;
        overflow: auto;
    }
    .data-desc__list {
        height: 60px;
        cursor: pointer;
    }
    .active {
        color: #fff;
        background: #409eff;
    }
    .p-t-5 {
        padding-top: 4px;
    }
    .date-page {
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        color: #666;
        text-align: center;
        font-size: 12px;
    }

    .date-context__list {
        width: 240px;
        margin-bottom: 20px;
        .student-list-wrap {
            min-height: 32px;
        }
        .student-img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }
    }
}
</style>