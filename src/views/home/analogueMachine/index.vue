<template>
    <div>
        <div class="title font-28 flex-box items-center justify-s-b">
            <div class="p-l-ten">
                <div>
                    <span>{{ baseInfoMap['OrderCount']['Remake'] }}: {{ baseInfoMap['OrderCount']['Value'] }}</span>
                    <span
                        class="p-l-ten"
                    >{{ baseInfoMap['ClassCount']['Remake'] }}: {{ baseInfoMap['ClassCount']['Value'] }}</span>
                </div>
                <div>
                    <span>{{ baseInfoMap['MissCount']['Remake'] }}: {{ baseInfoMap['MissCount']['Value'] }}</span>
                </div>
            </div>
            <div class="p-r-ten">
                <el-button type="primary" size="mini" @click="showAppointmentListHandle">预约列表</el-button>
            </div>
        </div>
        <div class="flex-box area-wrap">
            <div class="font-28 p-l-ten area-title">区域：</div>
            <div class="area-list flex-box flex-wrap font-24 flex-1">
                <span
                    :class="{'area-list__active': selectAare.AreaOrganID === item.AreaOrganID}"
                    :key="item.AreaOrganID"
                    @click="selectAreaHandle(item)"
                    class="area-list__item"
                    v-for="item in areaList"
                >{{ item.AreaOragnName }}</span>
            </div>
        </div>
        <div class="flex-box area-wrap p-t-five">
            <div class="font-28 p-l-ten area-title">区域门店：</div>
            <div class="dept-list flex-box flex-wrap font-24 flex-1">
                <div
                    :class="{'area-list__active': selectRoom.RoomId === item.RoomId}"
                    :key="item.RoomId"
                    @click="selectRoomHandle(item)"
                    class="area-list__item"
                    v-for="item in roomList"
                >
                    <p>{{ item.DeptName }}</p>
                    <p class="m-t-4">{{ item.Address }}</p>
                </div>
            </div>
        </div>
        <div class="date-wrap">
            <div class="date-desc text-center flex-box p-t-five">
                <div
                    @click="datePreHandle"
                    class="date-page"
                >上一页</div>
                <div
                    :class="{'active': selectDate.date === item.date}"
                    :key="index"
                    @click="selectDateHandle(item)"
                    class="data-desc__list items-center flex-box justify-center flex-1"
                    v-for="(item, index) in dateList"
                >
                    <div>
                        <p class="font-24">{{ item.date }}</p>
                        <p class="font-24 p-t-5">{{ item.tips }}</p>
                    </div>
                </div>
                <div
                    @click="dateNextHandle"
                    class="date-page"
                >下一页</div>
            </div>
            <div
                class="date-context flex-1 p-ten"
                v-loading="loadding"
            >
                <div
                    class="font-24 color-6 flex-box flex-wrap"
                    v-if="analogueList.length"
                >
                    <div
                        :key="index"
                        class="m-r-ten m-b-ten text-center order-item"
                        v-for="(item, index) in analogueList"
                    >
                        <p>时间：{{ item.Times }}</p>
                        <p style="margin: 4px 0;">可约：{{ item.CanOrder }}</p>
                        <el-button
                            :disabled="item.CanOrder === 0"
                            size="mini"
                            type="primary"
                            @click="toAppointmentHandle(item)"
                            @comfirm="getAppointment"
                        >{{ item.CanOrder === 0 ? '已满' : '选择' }}</el-button>
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

        <appointment ref="appointment"></appointment>
        <appointment-list ref="appointmentList"></appointment-list>
    </div>
</template>
<script>
import {
    getSimulatorParams,
    baseInfo,
    getArea,
    getDept,
    getAppointment,
} from '@api/analogue.js';
import {
    getCurrentFiveDate,
    getPreviuosFiveDate,
    getNextFiveDate,
} from '../js/calender';

import appointment from './components/appointment.vue'
import appointmentList from './components/appointmentList.vue'
import bus from './js/Bus'

export default {
    components: {
        appointment,
        appointmentList
    },
    data() {
        return {
            baseInfoMap: {
                OrderCount: {},
                ClassCount: {},
                MissCount: {},
            },
            dateList: [],
            areaList: [],
            roomList: [],
            analogueList: [],
            selectDate: {},
            selectAare: {},
            selectRoom: {},
            loadding: false,
        };
    },
    mounted() {
        this.init();

        bus.$on('appointment', this.getAppointment)
    },
    beforeDestroy() {
        bus.$off('appointment', this.getAppointment)
    },
    methods: {
        init() {
            this.dateList = getCurrentFiveDate(7);
            this.selectDate = this.dateList[0];

            this.getSimulatorParams();
        },
        toAppointmentHandle(info) {
            
            this.$refs.appointment.init({ 
                time: info.Times, 
                companyId: this.baseInfoParams.companyId,
                roomId: String(this.selectRoom.RoomId),
                planDate: this.selectDate.date
            }, this.baseInfoParams)
        },
        showAppointmentListHandle() {
            this.$refs.appointmentList.init(this.baseInfoParams)
        },
        datePreHandle() {
            this.dateList = getPreviuosFiveDate(this.dateList[0].stamp, 7);
        },
        dateNextHandle() {
            this.dateList = getNextFiveDate(
                this.dateList[this.dateList.length - 1].stamp,
                7
            );
        },
        selectDateHandle(item) {
            this.selectDate = item;
            this.getAppointment();
        },
        selectAreaHandle(item) {
            this.selectAare = item;
            this.getDept();
        },
        selectRoomHandle(item) {
            this.selectRoom = item;
            this.getAppointment();
        },
        getAppointment() {
            this.loadding = true;
            let params = Object.assign(this.baseInfoParams, {
                roomId: String(this.selectRoom.RoomId),
                PlanDate: this.selectDate.date,
            });
            getAppointment(params)
                .then((res) => {
                    this.loadding = false;
                    this.analogueList = res.result;
                })
                .catch(() => {
                    this.analogueList = [];
                    this.loadding = false;
                });
        },
        getArea() {
            getArea({
                companyId: this.baseInfoParams.companyId,
            })
                .then((res) => {
                    this.areaList = res.result;
                    this.selectAare = this.areaList[0];
                    this.getDept();
                })
                .catch(() => {});
        },
        getDept() {
            getDept({
                areaId: this.selectAare.AreaOrganID,
                Lat: '22.567543',
                Lng: '113.981711',
                companyId: this.baseInfoParams.companyId,
            })
                .then((res) => {
                    this.roomList = res.result;
                    this.selectRoom = this.roomList[0];
                    this.getAppointment();
                })
                .catch(() => {});
        },
        getSimulatorParams() {
            getSimulatorParams({
                companyId: '16',
                idCardNum: '440982199508063659',
            })
                .then((res) => {
                    const result = res.result[0];
                    this.baseInfoParams = {
                        companyId: String(result.CompanyId),
                        stuid: String(result.StuId),
                    };

                    this.getBaseInfo();
                    this.getArea();
                })
                .catch(() => {});
        },
        getBaseInfo() {
            baseInfo(this.baseInfoParams)
                .then((res) => {
                    const baseInfoMap = {};
                    res.result.forEach((item) => {
                        baseInfoMap[item.Type] = item;
                    });

                    this.baseInfoMap = baseInfoMap;
                })
                .catch(() => {});
        },
    },
};
</script>
<style lang="scss" scoped>
.title {
    height: 80px;
    background: #eee;
}
.date-wrap {
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    .date-desc {
        // width: 130px;
        // height: 400px;
        // height: 380px;
        background: #eee;
        user-select: none;
    }
    .date-context {
        height: 218px;
        overflow: auto;
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;

        .order-item {
            width: 200px;
        }
    }
    .data-desc__list {
        height: 46px;
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
        height: 46px;
        line-height: 46px;
        color: #666;
        text-align: center;
        font-size: 12px;
        width: 105px;
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

.area-wrap {
    background: #eee;
    .area-title {
        text-align: right;
        width: 90px;
    }
    .area-list__item {
        padding: 6px 16px;
        cursor: pointer;
        border-radius: 6px;
    }
    .area-list__active {
        color: #fff;
        background: #409eff;
    }
    .dept-list {
        .area-list__item {
            max-width: 200px;
        }
    }
    .m-t-4 {
        margin-top: 4px;
    }
}
</style>