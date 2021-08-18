<template>
    <el-dialog
        :visible.sync="dialogVisible"
        title="练车记录"
        width="1004px"
    >
        <div v-show="userInfo.student.thirdpartyId === '2021031123300112de106c3a60459bb38f4e601b56101a'">
            <el-form
                :inline="true"
                :model="form"
                label-width="80px"
                ref="form"
            >
                <el-form-item label="学员Id:">
                    <el-input style="width: 420px;" clearable v-model="form.stuID" placeholder="请输入学员id"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        @click="onSubmit"
                        type="primary"
                    >查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
            :data="tableData"
            border
            max-height="400"
            style="width: 100%"
            v-loading="loading"
        >
            <el-table-column
                align="center"
                label="课程名称"
                prop="scheduleTypeName"
                width="180"
            ></el-table-column>
            <el-table-column
                label="学员"
                prop="name"
                width="120"
            >
                <template slot-scope="scope">
                    <div class="flex-box flex-wrap">
                        <div
                            :key="index"
                            class="flex-box items-center"
                            v-for="(item, index) in scope.row.studentList"
                        >
                            <img
                                :src="item.url"
                                class="coach-img"
                            />
                            <span class="p-l-five">{{ item.stuName }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="教练"
                prop="name"
                width="120"
            >
                <template slot-scope="scope">
                    <div class="flex-box items-center">
                        <img
                            :src="scope.row.headPhoto"
                            class="coach-img"
                        />
                        <span class="p-l-five">{{ scope.row.coachName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="时间"
            >
                <template slot-scope="scope">
                    <div>{{ scope.row.planDate }} {{ scope.row.startTime }}-{{ scope.row.endTime }}</div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="地点"
                prop="trainAreaName"
            ></el-table-column>
            <el-table-column
                align="center"
                label="状态"
                prop="reservationRemark"
            ></el-table-column>
            <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="120"
            >
                <template slot-scope="scope">
                    <el-button
                        @click="cancel(scope.row)"
                        size="mini"
                        type="danger"
                        v-if="scope.row.reservationState === 0"
                    >取消预约</el-button>
                </template>
            </el-table-column>
        </el-table>

        <span
            class="dialog-footer"
            slot="footer"
        >
            <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
            <el-button
                @click="dialogVisible = false"
                type="primary"
            >关 闭</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { getStudyInfo } from '@api/home';

export default {
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            loading: false,
            form: {
                stuID: '',
            },
        };
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        },

    },
    methods: {
        init() {
            this.dialogVisible = true;

            this.$nextTick(() => {
                const stuID = this.userInfo.student.thirdpartyId;
                this.getList(stuID);
            });
        },
        onSubmit() {
            const userInfo = this.$store.state.userInfo;
            const stuID = this.form.stuID || userInfo.student.thirdpartyId;
            
            this.getList(stuID);
        },
        getList(stuID) {
            this.loading = true;
            this.tableData = [];

            getStudyInfo({
                companyID: this.userInfo.student.schoolThirdpartyId,
                stuID,
            })
                .then((res) => {
                    this.loading = false;
                    this.tableData = res.result;
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        // cancel(info) {},
    },
};
</script>
<style lang="scss" scoped>
.coach-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
.p-l-4 {
    padding-left: 4px;
}
</style>