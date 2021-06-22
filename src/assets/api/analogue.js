import { post, get } from '@js/request'

export function getSimulatorParams(data) {
    return post('/v1/analog/getSimulatorParams', data)
}

export function baseInfo(data) {
    return post('/v1/analog/orderBaseInfo', data)
}