<template>
    <div class="flex-box items-center">
        <div class="img-wrap" v-if="coachInfo.headPhoto">
            <img class="width-100 height-100" :src="coachInfo.headPhoto" />
        </div>
        <div class="color-6 p-l-five font-28">
            <p>{{ coachInfo.coachName }} <span class="color-9 font-24">{{ coachInfo.mobile }}</span></p>
            <p class="color-9">带教学员{{ coachInfo.loadStudents }}人, {{ coachInfo.listPlateNumbers.join('~') }}</p>
        </div>
    </div>
</template>
<script>
import { getCoachDetail, getCoachHeadPhoto } from '@api/home'

export default {
    data() {
        return {
            coachInfo: {
                listPlateNumbers: []
            }
        }
    },
    created() {
        this.getCoachInfo();
    },
    methods: {
        getCoachInfo() {
            const userInfo = this.$store.state.userInfo;
            const coachInfo = this.$store.state.coachInfo;

            Promise.all([getCoachDetail({
                coachThirdPartyId: coachInfo.coachId,
                id: coachInfo.id,
                type: '1',
            }), getCoachHeadPhoto({
                companyId: userInfo.student.schoolThirdpartyId,
                coachId: coachInfo.coachId
            })]).then(res => {
                const info1 = res[0].result;
                const info2 = res[1].result;
                
                this.coachInfo = {
                    coachName: info1.coachName,
                    loadStudents: info1.loadStudents,
                    listPlateNumbers: info1.listPlateNumbers,
                    subjectNames: info1.subjectNames,
                    mobile: info1.mobile,
                    headPhoto: info2.headPhoto,
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.img-wrap {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    overflow: hidden;
}
</style>
