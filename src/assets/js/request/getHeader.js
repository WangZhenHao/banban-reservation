import store from '@src/store'

export function getHeader() {
    const banbanHeader = {
        'app-type': '1',
        'ctl-device-id': 'android_device_id',
        'device-type': 'android',
        'version-code': '26',
        'version-name': '4.5.14',
        'version-type': 'student'
    }

    const token = store.state.userToken['ctl-token'];
    if(token) {
        banbanHeader['ctl-token'] = token
    }

    return banbanHeader
}