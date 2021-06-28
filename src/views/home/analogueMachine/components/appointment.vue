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
            >确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { getSimulatorNumber } from '@api/analogue';
export default {
    data() {
        return {
            dialogVisible: false,
            list: [],
            selectItem: {},
        };
    },
    methods: {
        init(info) {
            this.dialogVisible = true;
            this.info = info;
            console.log(this.$parent);
            getSimulatorNumber(info)
                .then((res) => {
                    this.list = res.result;
                })
                .catch(() => {});
        },
        selectHandle(item) {
            this.selectItem = item;
        },
        confirm() {},
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
