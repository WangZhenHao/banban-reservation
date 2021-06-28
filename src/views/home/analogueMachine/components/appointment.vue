<template>
    <el-dialog
        title="预约"
        :visible.sync="dialogVisible"
        width="640px">
        <div>
            sdfsdfsdf
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { getSimulatorNumber } from '@api/analogue'
export default {
    data() {
        return {
            dialogVisible: false,
            list: []
        }
    },
    methods: {
        init(info) {
            this.dialogVisible = true;
            this.info = info;
            getSimulatorNumber(info).then(res => {

            }).catch(() => {

            })
        },
        confirm() {

        }
    }
}
</script>
