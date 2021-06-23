import { post, get } from '@js/request'

export function getSimulatorParams(data) {
    return post('/v1/analog/getSimulatorParams', data)
}

export function baseInfo(data) {
    return post('/v1/analog/orderBaseInfo', data)
}

export function getArea(data) {
    return post('/v1/analog/getArea', data)
}

export function getDept(data) {
    return post('/v1/analog/getDept', data)
}

export function getAppointment(data) {
    return post('/v1/analog/getAppointment', data, { showError: false })
}

export function getSimulatorNumber(data) {
    return post('/v1/analog/getSimulatorNumber', data)
}
