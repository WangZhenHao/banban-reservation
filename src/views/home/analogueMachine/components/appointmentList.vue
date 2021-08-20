<template>
    <el-dialog
        :visible.sync="dialogVisible"
        title="模拟机预约列表"
        width="1004px"
    >
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            max-height="400"
            v-loading="loading"
        >
            <el-table-column
                align="center"
                label="模拟机场地"
                prop="Roomsname"
                width="180"
            ></el-table-column>
            
            <el-table-column
                align="center"
                label="时间"
            >
              <template slot-scope="scope">
                  {{ scope.row.Date }}  {{ scope.row.times }}
              </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="模拟机号"
                prop="MNQname"
                width="80"
            ></el-table-column>
            <el-table-column
                align="center"
                label="地址"
                prop="Address"
            ></el-table-column>
            <el-table-column
                align="center"
                label="状态"
                prop="Address"
                width="70"
            >
              <template slot-scope="scope">
                  {{ showStatus(scope.row.State) }}
              </template>
            </el-table-column>
            <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="120"
            >
                <template slot-scope="scope">
                    <el-button
                        @click="cancelAppointment(scope.row)"
                        size="mini"
                        type="danger"
                        v-if="scope.row.State === 0"
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

const STATUSMAP = {
    0: '待开始',
    1: '已完成',
    3: '已取消',
    4: '爽约'
}
import {
    searchAppointment,
    cancelAppointment
} from '@api/analogue.js'

import bus from '../js/Bus'

export default {
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            loading: false
        }
    },
    methods: {
        init(info) {
            this.dialogVisible = true;
            this.info = info

            this.getList();
        },
        showStatus(type) {
            let text = ''

            text = STATUSMAP[type] ? STATUSMAP[type] : '未知状态'

            return text
        },
        getList() {
            this.loading = true;

            searchAppointment(this.info).then(res => {
                this.loading = false
                this.tableData = res.result
            }).catch(() => {
                this.loading = false;
            })
        },
        cancelAppointment(info) {
            
            this.$confirm(`确定取消吗？`, '提示').then(
                () => {
                    cancelAppointment({
                        Id: String(info.Id),
                        companyId: this.info.companyId
                    }).then(() => {
                        this.$message.success('取消成功');
                        bus.$emit('appointment')
                        this.getList();
                    })
                }
            );

            
        }
    }
}
</script>
<style lang="scss" scoped>

</style>