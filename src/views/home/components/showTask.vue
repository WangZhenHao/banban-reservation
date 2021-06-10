<template>
    <div>
        <div v-show="taskTips" class="tips font-24 color-money">{{ taskTips }}</div>
        <el-table
            :data="tasksList"
            border
            style="width: 100%"
        >
            <el-table-column
                label="任务名称"
                prop="name"
                width="180"
            ></el-table-column>
            <el-table-column
                label="预约日期"
                prop="date"
                width="180"
            >
                <template slot-scope="scope">
                    <div>
                        <div v-if="scope.row.resource === 1">{{ scope.row.resourceStr }}</div>
                        <div v-else-if="scope.row.resource === 2">{{ scope.row.date }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="预约练车时段"
                prop="time"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.time[0] }}-{{ scope.row.time[1] }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="开抢时段"
                prop="time"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.robTime[0] }}-{{ scope.row.robTime[1] }}</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="300"
            >
                <template slot-scope="scope">
                    <el-button
                        :disabled="scope.row.taskStatus === 1"
                        @click="editHandle(scope.row)"
                        size="mini"
                        type="primary"
                    >编辑任务</el-button>
                    <el-button
                        @click="startHandle(scope.row)"
                        size="mini"
                        type="success"
                        v-if="scope.row.taskStatus === 0"
                    >开始任务</el-button>
                    <el-button
                        @click="stopTaskHandle(scope.row)"
                        size="mini"
                        type="success"
                        v-if="scope.row.taskStatus === 1"
                    >暂停任务</el-button>
                    <el-button
                        :disabled="scope.row.taskStatus === 1"
                        @click="delHandle(scope.row)"
                        size="mini"
                        type="danger"
                    >删除任务</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
// import { runTask, toReversion } from '../js/runTask';

export default {
    props: {
    },
    data() {
        return {
            taskLsit: [],
            index: 0,
        };
    },
    computed: {
        tasksList() {
            return this.$store.state.task.tasksList;
        },
        taskTips() {
            return this.$store.state.task.taskTips;
        },
    },
    methods: {
        editHandle(info) {
            this.$parent.addTaskHandle(info);
        },
        startHandle(info) {
            this.$store.dispatch('task/stopTask').then(() => {
                this.$store.dispatch('task/runTask', info);
            });
        },
        delHandle(info) {
            this.$confirm(`确定删除当前任务：${info.name}?`, '提示').then(
                () => {
                    this.$store.commit('task/delTask', info);
                }
            );
        },
        stopTaskHandle() {
            this.$store.dispatch('task/stopTask');
        },
    },
};
</script>
<style lang="scss" scoped>
.tips {
    padding: 10px 0;
}
</style>