<template>
    <div class="nav flex-box items-center justify-s-b">
        <div class="flex-box items-center">
            <div class="img-wrap">
                <img class="width-100 height-100" :src="userInfo.logoUrl" />
            </div>
            <div class="p-l-five color-9">
                <div class="font-28">{{ userInfo.userName }}</div>
                <div class="font-24 p-t-5">
                    <span>预约有效次数{{ houser.stuReservationHours }}</span> 
                    <span class="p-l-five">科目{{ userInfo.student.learnDriverProgress }}</span>
                </div>
            </div>
        </div>
        <div>
            <el-button size="mini" type="primary" @click="checkVip">检测是否在其他地方登录</el-button>
            <el-button size="mini" type="primary" @click="logout">退出登录</el-button>
        </div>
    </div>
</template>
<script>
import { getStudentHouer } from '@api/home'
import { checkVip } from '@api/login'

export default {
    data() {
        return {
            houser: {}
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo
        }
    },
    created() {
        this.getStudentHouer();
    },  
    methods: {
        logout() {
            this.$confirm('确定退出吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('logout')
            }).catch(() => {})
            
        },
        checkVip() {
            checkVip().then(res => {
                this.$message.success('账号信息正确，没有在其他地方登录.^_^.')
            }).catch(res => {
                
            })
        },
        getStudentHouer() {
            getStudentHouer({
                companyId: this.userInfo.student.schoolThirdpartyId,
                stuId: this.userInfo.student.thirdpartyId
            }).then(res => {
                this.houser = res.result
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.nav {
    height: 60px;
    .img-wrap {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
    }
    .p-t-5 {
        padding-top: 2px;
    }
}
</style>