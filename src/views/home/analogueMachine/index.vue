<template>
    <div>
        <div class="title font-28 flex-box items-center">
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
            <div></div>
        </div>
        <div class="date-wrap flex-box">
            <div class="date-desc text-center">
                <div
                    @click="datePreHandle"
                    class="date-page"
                >上一页</div>
                <div
                    :class="{'active': selectDate.date === item.date}"
                    :key="index"
                    @click="selectDateHandle(item)"
                    class="data-desc__list items-center flex-box justify-center"
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
            ></div>
        </div>
    </div>
</template>
<script>
import { getSimulatorParams, baseInfo } from '@api/analogue.js';
import { getCurrentFiveDate, getPreviuosFiveDate, getNextFiveDate } from '../js/calender';
export default {
    data() {
        return {
            baseInfoMap: {
                OrderCount: {},
                ClassCount: {},
                MissCount: {},
            },
            dateList: [],
            selectDate: {},
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.dateList = getCurrentFiveDate(7);
            this.selectDate = this.dateList[0];

            this.getSimulatorParams();
        },
        datePreHandle() {
            this.dateList = getPreviuosFiveDate(this.dateList[0].stamp, 7);
        },
        dateNextHandle() {
            this.dateList = getNextFiveDate(this.dateList[this.dateList.length - 1].stamp, 7)
        },
        selectDateHandle(item) {
            this.selectDate = item;
        },
        getPlanInfo() {

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

                    this.baseInfo();
                })
                .catch(() => {});
        },
        baseInfo() {
            baseInfo(this.baseInfoParams)
                .then((res) => {
                    const baseInfoMap = {};
                    res.result.forEach((item) => {
                        baseInfoMap[item.Type] = item;
                    });

                    this.baseInfoMap = baseInfoMap;
                    console.log(this.baseInfoMap);
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
        height: 26px;
        line-height: 26px;
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