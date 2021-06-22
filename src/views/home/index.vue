<template>
    <div class="container">
        <nav-wrap></nav-wrap>
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
            
        };
    },
};
</script>
<style lang="scss" scoped>
.container {
    width: 1024px;
    margin: 0 auto;
}
</style>