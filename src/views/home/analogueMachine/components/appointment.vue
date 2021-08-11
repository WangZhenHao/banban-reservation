<template>
    <el-dialog
        :visible.sync="dialogVisible"
        title="预约"
        width="640px"
    >
        <div>
            <div>
                <el-button
                    size="mini"
                    :key="item.SimId"
                    @click="selectHandle(item)"
                    class="list-item"
                    v-for="(item) in list"
                    :disabled="item.isOrder === 0"
                    :type="selectItem.SimId === item.SimId ? 'primary' : ''"
                >{{ item.name }}</el-button>
            </div>
        </div>
        <span
            class="dialog-footer"
            slot="footer"
        >
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
                @click="confirm"
                type="primary"
                :loading="loading"
            >确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { getSimulatorNumber, saveAppointment } from '@api/analogue';
import bus from '../js/Bus'

export default {
    data() {
        return {
            dialogVisible: false,
            list: [],
            selectItem: {},
            loading: false
        };
    },
    methods: {
        init(info, params) {
            this.dialogVisible = true;
            this.info = info;
            this.baseParams = params
            this.selectItem = {}
            
            getSimulatorNumber(info)
                .then((res) => {
                    this.list = res.result;
                })
                .catch(() => {});
        },
        selectHandle(item) {
            if(item.SimId === this.selectItem.SimId) {
                this.selectItem = {}
            } else {
                this.selectItem = item;
            }
        },
        confirm() {
            const {
                companyId,
                planDate,
                roomId,
                time: Times,
            } = this.info;
            const userInfo = this.$store.state.userInfo.student;
            const { stuid } = this.baseParams;
            let simId =this.selectItem.SimId
            if(!simId) {
                this.$message.error('请选择模拟机')
                return
            }

            simId =  String(simId)
            this.loading = true
            saveAppointment({
                companyId,
                planDate,
                Times,
                roomId,
                stuid,
                mobile: userInfo.mobile,
                stuName: userInfo.name,
                remark: '7',
                role: '5',
                simId,
                userId: userInfo.id
            }).then((res) => {
                this.loading = false;
                this.dialogVisible = false;

                this.$message.success(res.message);
                bus.$emit('appointment')
            }).catch(() => {
                this.loading = false;
            })
        },
    },
};
</script>
<style lang="scss" scoped>
// .list-item {
//     padding: 6px 10px;
//     background: #409eff;
//     border-radius: 100px;
//     margin-left: 20px;
//     cursor: pointer;
//     user-select: none;
// }
// .list-item__active {
//     background: ;
// }
</style>
