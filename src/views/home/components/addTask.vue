<template>
    <el-dialog
        :visible.sync="dialogVisible"
        :title="title === 1 ? '编辑' : '新增' + '任务'"
        width="640px"
    >
        <el-form
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            ref="ruleForm"
        >
            <el-form-item
                label="任务名称"
                prop="name"
            >
                <el-input
                    placeholder="任意一个名称都行"
                    v-model="ruleForm.name"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="执行时机"
                prop="resource"
            >
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio :label="1">每天</el-radio>
                    <el-radio :label="2">某一天</el-radio>
                    <!-- <el-radio :label="3">日期范围</el-radio> -->
                    <!-- <el-radio label="日期范围"></el-radio> -->
                </el-radio-group>
            </el-form-item>
            <el-form-item
                label="预约日期"
                prop="date"
                v-if="ruleForm.resource === 2"
            >
                <el-date-picker
                    placeholder="选择日期"
                    type="date"
                    v-model="ruleForm.date"
                ></el-date-picker>
            </el-form-item>
            <el-form-item
                label="预约时间段"
                prop="time"
            >
                <el-time-picker
                    end-placeholder="结束时间"
                    is-range
                    placeholder="选择时间范围"
                    range-separator="至"
                    start-placeholder="开始时间"
                    v-model="ruleForm.time"
                ></el-time-picker>
                <div class="font-24 color-money">提示：选择的时间段要和教练公布练车的时间段一致</div>
            </el-form-item>
            <el-form-item
                label="开抢时间段"
                prop="robTime"
            >
                <el-time-picker
                    end-placeholder="结束时间"
                    is-range
                    placeholder="选择时间范围"
                    range-separator="至"
                    start-placeholder="开始时间"
                    v-model="ruleForm.robTime"
                ></el-time-picker>
                <div class="font-24 color-money">提示：教练每天发布排班的时间段</div>
            </el-form-item>
            
        </el-form>
        <span
            class="dialog-footer"
            slot="footer"
        >
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button @click="resetForm">重置</el-button>
            <el-button
                @click="confirm"
                type="primary"
            >确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { timestampToDate  } from '@js/utils/utils'
const resourceMap = {
    1: '每天',
    2: '某一天'
}
export default {
    data() {
        return {
            title: '',
            dialogVisible: false,
            ruleForm: {
                name: '',
                resource: 2,
                time: [new Date(2016, 9, 10, 19, 0), new Date(2016, 9, 10, 20, 0)],
                robTime: [new Date(2016, 9, 10, 20, 0), new Date(2016, 9, 10, 22, 0)],
                taskStatus: 0,
                date: ''
            },
            rules: {
                resource: [
                    {
                        required: true,
                        message: '请选择执行时机',
                    },
                ],
                name: [
                    {
                        required: true,
                        message: '请输入任务名称',
                        trigger: 'blur',
                    },
                ],
                date: [
                     {
                        required: true,
                        message: '请选择日期',
                    },
                ],
                time: [
                    {
                        required: true,
                        message: '请选择时间段',
                    },
                ],
                robTime: [
                    {
                        required: true,
                        message: '请选择开抢时间段',
                    },
                ]
            },
        };
    },
    methods: {
        init(info) {
            this.dialogVisible = true;
            
            this.$nextTick(() => {
                this.resetForm();
                if(info && info.id) {
                    this.title = 1;
                    this.ruleForm = JSON.parse(JSON.stringify(info));
                    this.ruleForm.time = [new Date('2021-6-10 ' + info.time[0]), new Date('2021-6-10 ' + info.time[1])]
                    this.ruleForm.robTime = [new Date('2021-6-10 ' + info.robTime[0]), new Date('2021-6-10 ' + info.robTime[1])]
                    this.ruleForm.date = new Date(info.date)
                } else {
                    this.title = 2
                }
            })
            
            
            
        },
        confirm() {
            this.$refs['ruleForm'].validate((valid) => {
                if(valid) {
                    this.dialogVisible = false;
                    const ruleForm = JSON.parse(JSON.stringify(this.ruleForm));
                    const { robTime, time, date } = this.ruleForm;
                    
                    ruleForm.robTime = [timestampToDate('hh:mm', robTime[0].getTime()), timestampToDate('hh:mm', robTime[1].getTime())]
                    ruleForm.time = [timestampToDate('hh:mm', time[0].getTime()), timestampToDate('hh:mm', time[1].getTime())]
                    ruleForm.resourceStr = resourceMap[ruleForm.resource];
                    if(date) {
                        ruleForm.date = timestampToDate('yyyy-MM-DD', date.getTime())
                    }
                    
                    // this.$emit('add-task', ruleForm)
                    if(this.title === 1) {
                        
                        this.$store.commit('task/editTask', ruleForm)
                    } else {
                        ruleForm.id = 'task-' + ~~(Math.random() * 999999)
                        this.$store.commit('task/addTask', ruleForm)
                    }
                }
            })
        },
        resetForm() {
            this.$refs['ruleForm'].resetFields();
        }
    },
};
</script>
<style lang="scss" scoped>
.color-money {
    line-height: normal;
    padding-top: 5px;
    color: #999;
}
</style>