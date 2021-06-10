import { post, get } from '@js/request'

export function login(data) {
    return post('/v1/banban/login', data)
}

export function getUserInfo(data = {}) {
    return get('/v1/banban/getUserInfo', data)
}

export function getCoachInfo(data) {
    return get('/v1/banban/getCoachInfo', data)
}

export function checkVip(data = {}) {
    return get('/v1/banban/checkVip', data)
}
