<template>
    <div class="container">
        <!-- <nav-wrap></nav-wrap> -->
        <div>
            <div class="coach-wrap flex-box items-center justify-s-b p-ten">
                <div>
                    <coach-detail ref="coachDetail"></coach-detail>
                </div>
                <div>
                    <el-button
                        @click="resetDateHandle"
                        size="mini"
                        type="warning"
                    >重置日期</el-button>
                    <el-button
                        @click="showStudyListHandle"
                        size="mini"
                        type="primary"
                    >练车记录</el-button>
                    <el-button
                        @click="addTaskHandle"
                        size="mini"
                        type="primary"
                    >添加自动预约任务</el-button>
                </div>
            </div>
            <div class="date-wrap flex-box">
                <div class="date-desc text-center">
                    <div class="date-page" @click="datePreHandle">上一页</div>
                    <div
                        :class="{'active': selectDate.date === item.date}"
                        :key="index"
                        @click="selectDateHandle(item)"
                        class="data-desc__list items-center flex-box justify-center"
                        v-for="(item, index) in dateList"
                    >
                        <div>
                            <p class="font-28">{{ item.date }}</p>
                            <p class="font-24 p-t-5">{{ item.tips }}</p>
                        </div>
                    </div>
                    <div class="date-page" @click="dateNextHandle">下一页</div>
                </div>
                <div
                    class="date-context flex-1 p-ten"
                    v-loading="loadding"
                >
                    <div
                        class="flex-box flex-wrap"
                        v-if="planList.length"
                    >
                        <div
                            :key="index"
                            class="date-context__list"
                            v-for="(item, index) in planList"
                        >
                            <div class="flex-box">
                                <div>{{ filterTime(item.startTime) }}-{{ filterTime(item.endTime) }}</div>
                                <div>{{ item.licensePlate }}</div>
                            </div>
                            <div>
                                <div>{{ item.scheduleTypeName }}</div>
                                <div>{{ item.trainAreaName }}</div>
                            </div>
                            <div class="student-list-wrap">
                                <img
                                    :key="j"
                                    :src="info.url"
                                    class="student-img"
                                    v-for="(info, j) in item.studentList"
                                    :title="userInfo.student.thirdpartyId === '2021031123300112de106c3a60459bb38f4e601b56101a' ? info.stuName : ''"
                                />
                                <!-- <span
                                    :key="k"
                                    v-for="(desc, k) in item.studentList"
                                >{{ desc.stuName }}</span> -->
                                <!-- <div>{{}}</div> -->
                            </div>
                            <!-- <div
                                class="font-24 color-9"
                                v-if="userInfo.student.thirdpartyId === '2021031123300112de106c3a60459bb38f4e601b56101a'"
                            >
                                <span
                                    :key="j"
                                    style="padding-left: 5px;"
                                    v-for="(info, j) in item.studentList"
                                >{{ info.stuName }}</span>
                            </div> -->
                            <div>
                                <el-button
                                    :disabled="!(item.reservationState === 3)"
                                    @click="reversionPlan(item)"
                                    type="primary"
                                    size="mini"
                                >{{ item.reservationRemark }}</el-button>
                            </div>
                        </div>
                    </div>
                    <div
                        class="text-center height-100 flex-box items-center"
                        v-else
                    >
                        <div class="width-100 color-9">暂无排班</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-t-ten">
            <show-task ref="showTask"></show-task>
        </div>
        <study-list ref="studyList"></study-list>
        <add-task
            @add-task="comfirmTaskHandle"
            ref="addTask"
        ></add-task>
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
            // coachInfo: {
            //     coachId: '100050',
            // },
            selectDate: {},
            planList: [],
            loadding: false,
            // taskList: [
            //     {
            //         name: '明天的预约',
            //         resource: 2,
            //         resourceStr: '某一天',
            //         date: '2021-06-10',
            //         time: ['19:00', '20:00'],
            //         robTime: ['20:00', '22:00'],
            //         taskStatus: 0,
            //         id: '1111'
            //     },
            // ],
        };
    },
    mounted() {
        this.init();
        this.$store.dispatch('task/initTask')
    },
    destroyed() {
        this.$store.dispatch('task/stopTask');
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