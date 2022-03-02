<template>
    <div class="nav flex-box items-center justify-s-b">
        <div class="flex-box items-center">
            <div class="img-wrap">
                <img
                    :src="userInfo.logoUrl"
                    class="width-100 height-100"
                />
            </div>
            <div class="p-l-five color-9">
                <div class="font-28">{{ userInfo.userName }}</div>
                <div class="font-24 p-t-5">
                    <span>预约有效次数{{ houser.stuReservationHours }}</span>
                    <span class="p-l-five">科目{{ userInfo.student.learnDriverProgress }}</span>
                </div>
            </div>
        </div>
        <div class="flex-box items-center">
            <el-button
                :loading="vipLoading"
                @click="checkVip"
                size="mini"
                type="primary"
            >检测是否在其他地方登录</el-button>
            <el-button
                @click="logout"
                size="mini"
                type="primary"
            >退出登录</el-button>
            <a href="https://github.com/WangZhenHao/banban-reservation" class="flex-box items-center" style="margin-left: 10px;">
                <svg
                    aria-hidden="true"
                    class="octicon octicon-mark-github v-align-middle"
                    data-view-component="true"
                    height="24"
                    version="1.1"
                    viewBox="0 0 16 16"
                    width="24"
                >
                    <path
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                        fill-rule="evenodd"
                    />
                </svg>
            </a>
        </div>
    </div>
</template>
<script>
import { getStudentHouer } from '@api/home';
import { checkVip } from '@api/login';

export default {
    data() {
        return {
            houser: {},
            vipLoading: false,
        };
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        },
    },
    created() {
        this.getStudentHouer();
    },
    methods: {
        logout() {
            this.$confirm('确定退出吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.$store.dispatch('logout');
                })
                .catch(() => {});
        },
        checkVip() {
            this.vipLoading = true;
            checkVip()
                .then((res) => {
                    this.$message.success(
                        '账号信息正确，没有在其他地方登录.^_^.'
                    );
                    this.vipLoading = false;
                })
                .catch((res) => {
                    this.vipLoading = false;
                });
        },
        getStudentHouer() {
            getStudentHouer({
                companyId: this.userInfo.student.schoolThirdpartyId,
                stuId: this.userInfo.student.thirdpartyId,
            }).then((res) => {
                this.houser = res.result;
            });
        },
    },
};
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