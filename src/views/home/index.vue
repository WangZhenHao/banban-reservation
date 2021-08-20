<template>
    <div class="container">
        <nav-wrap></nav-wrap>
        <div>
            <el-tabs v-model="linkComponent" @tab-click="handleClick">
                <el-tab-pane label="模拟机预约" name="analogueMachine"></el-tab-pane>
                <el-tab-pane label="科目二/三" name="twoSubject"></el-tab-pane>
            </el-tabs>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import navWrap from './components/header';


export default {
    components: {
        navWrap,
    },
    data() {
        return {
            linkComponent: 'twoSubject'
        };
    },
    mounted() {
        this.handleClick(this.linkComponent)
    },
    methods: {
        handleClick() {
            this.$router.push({
                name: this.linkComponent
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    width: 1024px;
    margin: 0 auto;
}
</style>