<template>
    <div class="login-wrap flex-box items-center">
        <div class="login">
            <el-input
                class="m-b-ten"
                placeholder="请输入电话号码"
                v-model="fromData.account"
            ></el-input>
            <el-input
                class="m-b-ten"
                placeholder="请输入密码"
                show-password
                v-model="fromData.password"
            ></el-input>

            <el-button
                @click="confirmLogin"
                class="width-100"
                type="primary"
                :loading="loading"
            >登 录</el-button>
        </div>
    </div>
</template>
<script>
import { login, getUserInfo, getCoachInfo } from '@api/login.js'
import { mobilePhoneFormat } from '@js/utils/utils.js'


export default {
    data() {
        return {
            fromData: {
                account: '',
                password: ''
            },
            loading: false
        };
    },
    mounted() {
    },
    methods: {
        async confirmLogin() {
            if(!this.checkForm()) return;
            
            try {
                this.loading = true;
                const token = await login(this.fromData)
                this.$store.commit('saveUserToken', token.result);
                tools.setLocalStorage('userToken', token.result, 60 * 6000)
                
                const info = await getUserInfo();
                this.$store.commit('saveUserInfo', info.result)
                tools.setLocalStorage('userInfo', info.result, 60 * 6000)
                
                const coachInfo = await getCoachInfo()
                this.$store.commit('saveCoachInfo', coachInfo.result);
                tools.setLocalStorage('coachInfo', coachInfo.result, 60 * 6000)

                this.$router.replace({ name: 'home' })
            } catch(e) {
                this.loading = false;
                console.error(e)
            }
        },
        checkForm() {
            if(!mobilePhoneFormat(this.fromData.account)) {
                this.$message.warning('请输入正确手机号');
                return false;
            } else if(!this.fromData.password) {
                this.$message.warning('请输入密码');
                return false
            }

            return true;
        }
    },
};
</script>
<style scoped lang="scss">
.login-wrap {
    max-width: 460px;
    height: 100vh;
    margin: auto;
    .login {
        margin: auto;
    }
}
</style>