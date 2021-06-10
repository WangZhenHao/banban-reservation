import { postRequest, getRequest } from './request'

// ctl-token=
var btn = document.querySelector('#btn')
var login = document.querySelector('#login');
var getUserInfo = document.querySelector('#getUserInfo');
var reversion = document.querySelector('#reversion');

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblR5cGUiOiJzdHVkZW50IiwiZXhwIjoxNjI1NjAzNDAwLCJ1c2VySWQiOiIyMDIxMDMxNTA4MTkwMnV0OXN2Nmp2eTNmdGJ5YXd2d3FsdTYiLCJpYXQiOjE2MjMwNTI4NjQsImp0aSI6IjJmNWQ1NjIxZTZjYTRlY2I4ZmJjYWIyZDNhNGM0ZTUxIn0.frLjB5u0y2Q7UANn9cu1m_UBdBBdoqo4RdnS8p5H_LQ'

btn.onclick = function() {
    postRequest('http://127.0.0.1:3001/v1/banban/getPlanInfo', {
        companyID: '16',
        coachID: '100050',
        planDate: '2021-06-07',
        stuID: '2021031123300112de106c3a60459bb38f4e601b56101a',
        carType: 'C2',
        subjectId: '2'
    }, {
        headers: {
            'app-type': '1',
            'ctl-device-id': 'android_device_id',
            'ctl-token': TOKEN,
            'device-type': 'android',
            'version-code': '26',
            'version-name': '4.5.14',
            'version-type': 'student'
        }
    })
}

login.onclick = function() {
    postRequest('http://127.0.0.1:3001/v1/banban/login', {
        "account":"18924298774",
        "password":"Aa1471047476"
    }, { 
        headers: {
            'app-type': '1',
            'ctl-device-id': 'android_device_id',
            'device-type': 'android',
            'version-code': '26',
            'version-name': '4.5.14',
            'version-type': 'student'
        }
    })
}


getUserInfo.onclick = function() {
    getRequest('http://127.0.0.1:3001/v1/banban/getUserInfo', {}, {
        headers: {
            'app-type': '1',
            'ctl-device-id': 'android_device_id',
            'ctl-token': TOKEN,
            'device-type': 'android',
            'version-code': '26',
            'version-name': '4.5.14',
            'version-type': 'student'
        }
    })
}

reversion.onclick = function() {
    postRequest('http://127.0.0.1:3001/v1/banban/reservation', {
        companyID: '16',
        coachID: '100050',
        planId: '886484',
        stuId: '2021031123300112de106c3a60459bb38f4e601b56101a',
        reservationPeople: '1',
    }, {
        headers: {
            'app-type': '1',
            'ctl-device-id': 'android_device_id',
            'ctl-token': TOKEN,
            'device-type': 'android',
            'version-code': '26',
            'version-name': '4.5.14',
            'version-type': 'student'
        }
    })
}