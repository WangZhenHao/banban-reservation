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
.coach-wrap {
    height: 80px;
    background: #eee;
    border: 1px solid #dedede;
}
.date-wrap {
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    .date-desc {
        width: 130px;
        // height: 400px;
        height: 380px;
        background: #eee;
        user-select: none;
    }
    .date-context {
        height: 380px;
        overflow: auto;
    }
    .data-desc__list {
        height: 60px;
        cursor: pointer;
    }
    .active {
        color: #fff;
        background: #409eff;
    }
    .p-t-5 {
        padding-top: 4px;
    }
    .date-page {
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        color: #666;
        text-align: center;
        font-size: 12px;
    }

    .date-context__list {
        width: 240px;
        margin-bottom: 20px;
        .student-list-wrap {
            min-height: 32px;
        }
        .student-img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }
    }
}
</style>