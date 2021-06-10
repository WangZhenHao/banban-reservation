const Router = require('koa-router')
const validator = require('../../middleware/validator.js')
const { toObject } = require('../../utitls/index.js')
const request = require('../../request/request')

const router = new Router({})


router.post('/getPlanInfo', validator({
    companyID: { type: 'string', required: true },
    coachID: { type: 'string', required: true },
    planDate: { type: 'string', required: true },
    stuID: { type: 'string', required: true },
    carType: { type: 'string', required: true },
    subjectId: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers

    // console.log(headers)
    const options = {
        url: 'http://app.coach.caronline.cn/api/paiban/StuReservation/GetPlanInfo',
        method: "POST",
        body: data,
        headers: {
            "content-type": "application/json",
            'app-type': headers['app-type'],
            'ctl-device-id': headers['ctl-device-id'],
            'ctl-token': headers['ctl-token'],
            'device-type': headers['device-type'],
            'version-code': headers['version-code'],
            'version-name': headers['version-name'],
            'version-type': headers['version-type']
        }
        
    }

    let { body } = await request(options);
    body = toObject(body)

    ctx.body = body
})

router.post('/login', validator({
    account: { type: 'string', require: true },
    password: { type: 'string', require: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers
    data.loginType = 'student';

    const options = {
        url: 'https://app.chetailian.com/api/auth/outer/sysAuth/v1/login.pass',
        method: "POST",
        body: data,
        headers: {
            "content-type": "application/json",
            'app-type': headers['app-type'],
            'ctl-device-id': headers['ctl-device-id'],
            'device-type': headers['device-type'],
            'version-code': headers['version-code'],
            'version-name': headers['version-name'],
            'version-type': headers['version-type']
        }
    }

    let { body } = await request(options);
    body = toObject(body)

    ctx.body = body
})

// "schoolThirdpartyId":"16",
// "thirdpartyId":"2021031123300112de106c3a60459bb38f4e601b56101a"
// "studentType":"1",
/**
 * 获取用户信息
 */
router.get('/getUserInfo', async(ctx, next) => {
    const headers = ctx.headers

    const options = {
        url: 'https://app.chetailian.com/api/user/outer/sysUser/v1/load',
        method: "GET",
        headers: {
            "content-type": "application/json",
            'app-type': headers['app-type'],
            'ctl-device-id': headers['ctl-device-id'],
            'device-type': headers['device-type'],
            'version-code': headers['version-code'],
            'version-name': headers['version-name'],
            'version-type': headers['version-type'],
            'ctl-token': headers['ctl-token'],
        }
    }

    let { body } = await request(options);
    body = toObject(body)

    ctx.body = body
})

/**
 * 预约
 */
router.post('/reservation', validator({
    companyID: { type: 'string', required: true },
    coachID: { type: 'string', required: true },
    planId: { type: 'string', required: true },
    stuId: { type: 'string', required: true },
    reservationPeople: { type: 'string', required: true },
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers

    const options = {
        url: 'http://app.coach.caronline.cn/api/paiban/StuReservation/CheckAddReversion',
        method: "POST",
        body: data,
        headers: {
            "content-type": "application/json",
            'app-type': headers['app-type'],
            'ctl-device-id': headers['ctl-device-id'],
            'device-type': headers['device-type'],
            'version-code': headers['version-code'],
            'version-name': headers['version-name'],
            'version-type': headers['version-type'],
            'ctl-token': headers['ctl-token'],
        }
    }

    let { body } = await request(options);
    body = toObject(body)

    ctx.body = body
})

/**
 * 获取教练id接口
 */
router.get('/getCoachInfo', async(ctx, next) => {
    const headers = ctx.headers

    const options = {
        url: 'https://app.chetailian.com/api/zjerp/outer/coach/v1/getUserCoachType',
        method: "GET",
        headers: {
            "content-type": "application/json",
            'app-type': headers['app-type'],
            'ctl-device-id': headers['ctl-device-id'],
            'device-type': headers['device-type'],
            'version-code': headers['version-code'],
            'version-name': headers['version-name'],
            'version-type': headers['version-type'],
            'ctl-token': headers['ctl-token'],
        }
    }

    let { body } = await request(options);
    body = toObject(body)

    ctx.body = body
})

/**
 * 获取教练详细信息
 */
router.post('/getCoachDetail', validator({
    coachThirdPartyId: { type: 'string', required: true },
    id: { type: 'string', required: true },
    type: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers

    const options = {
        url: 'https://app.chetailian.com/api/zjerp/outer/coach/v1/getUserCoachNew',
        method: "POST",
        body: data,
        headers: {
            "content-type": "application/json",
            'app-type': headers['app-type'],
            'ctl-device-id': headers['ctl-device-id'],
            'device-type': headers['device-type'],
            'version-code': headers['version-code'],
            'version-name': headers['version-name'],
            'version-type': headers['version-type'],
            'ctl-token': headers['ctl-token'],
        }
    }

    let { body } = await request(options);
    body = toObject(body)

    ctx.body = body
})

/**
 * 获取教练头像
 */
router.post('/getCoachHeadPhoto', validator({
    companyId: { type: 'string', required: true },
    coachId: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers

    const options = {
        url: 'http://app.coach.caronline.cn/api/coach/Login/GetCoachHeadPhoto',
        method: "POST",
        body: data,
        headers: {
            "content-type": "application/json",
            'app-type': headers['app-type'],
            'ctl-device-id': headers['ctl-device-id'],
            'device-type': headers['device-type'],
            'version-code': headers['version-code'],
            'version-name': headers['version-name'],
            'version-type': headers['version-type'],
            'ctl-token': headers['ctl-token'],
        }
    }

    let { body } = await request(options);
    body = toObject(body)

    ctx.body = body
})

/**
 * 获取学时
 */
router.post('/getStudentHour', validator({
    companyId: { type: 'string', required: true },
    stuId: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers

    const options = {
        url: 'http://app.coach.caronline.cn/api/paiban/StuReservation/GetStudentHour',
        method: "POST",
        body: data,
        headers: {
            "content-type": "application/json",
            'app-type': headers['app-type'],
            'ctl-device-id': headers['ctl-device-id'],
            'device-type': headers['device-type'],
            'version-code': headers['version-code'],
            'version-name': headers['version-name'],
            'version-type': headers['version-type'],
            'ctl-token': headers['ctl-token'],
        }
    }

    let { body } = await request(options);
    body = toObject(body)

    ctx.body = body
})

/**
 * 获取学习记录列表
 */
router.post('/getStudyInfo', validator({
    companyID: { type: 'string', required: true },
    stuID: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers

    const options = {
        url: 'http://app.coach.caronline.cn/api/paiban/StuReservation/GetStudentOrderInfo',
        method: "POST",
        body: data,
        headers: {
            "content-type": "application/json",
            'app-type': headers['app-type'],
            'ctl-device-id': headers['ctl-device-id'],
            'device-type': headers['device-type'],
            'version-code': headers['version-code'],
            'version-name': headers['version-name'],
            'version-type': headers['version-type'],
            'ctl-token': headers['ctl-token'],
        }
    }

    let { body } = await request(options);
    body = toObject(body)

    ctx.body = body
})

/**
 * 检测账号是否在其他地方登录
 */
router.get('/checkVip', async(ctx, next) => {
    const headers = ctx.headers

    const options = {
        url: 'https://app.chetailian.com/api/exam/outer/vip/activeCode/checkVip',
        method: "GET",
        headers: {
            "content-type": "application/json",
            'app-type': headers['app-type'],
            'ctl-device-id': headers['ctl-device-id'],
            'device-type': headers['device-type'],
            'version-code': headers['version-code'],
            'version-name': headers['version-name'],
            'version-type': headers['version-type'],
            'ctl-token': headers['ctl-token'],
        }
    }

    let { body } = await request(options);
    body = toObject(body)

    ctx.body = body
})

module.exports = router;