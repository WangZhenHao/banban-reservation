import { post, get } from '@js/request'

export function getPlanInfo(data) {
    return post('/v1/banban/getPlanInfo', data)
}


export function getStudentHouer(data) {
    return post('/v1/banban/getStudentHour', data)
}

export function addReversion(data) {
    return post('/v1/banban/reservation', data)
}

// 获取教练信息
export function getCoachDetail(data) {
    return post('/v1/banban/getCoachDetail', data)
}

// 获取教练头像
export function getCoachHeadPhoto(data) {
    return post('/v1/banban/getCoachHeadPhoto', data)
}

// 获取学习记录
export function getStudyInfo(data) {
    return post('/v1/banban/getStudyInfo', data)
}