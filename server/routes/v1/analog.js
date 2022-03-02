const Router = require('koa-router')
const validator = require('../../middleware/validator.js')
const { toObject } = require('../../utitls/index.js')
const request = require('../../request/request')

const router = new Router({})

router.get('/test', async(ctx, next) => {
    ctx.body = { 'name': 'wzh' };
})

//  换取companyId和stuid
router.post('/getSimulatorParams', validator({
    companyId: { type: 'string', required: true },
    idCardNum: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers;
    const options = {
        url: 'http://sim.ctl.chelizitech.com:9901/api/simulator/change',
        method: "POST",
        form: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            'ctl-token': headers['ctl-token'],
        }
        
    }

    let { body } = await request(options);

    ctx.body = body
})

// 个人模拟机模块
router.post('/orderBaseInfo', validator({
    companyId: { type: 'string', required: true },
    stuid: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers;
    const options = {
        url: 'http://sim.ctl.chelizitech.com:9901/api/simulator/OrderBaseInfo',
        method: "POST",
        form: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            'ctl-token': headers['ctl-token'],
        }
        
    }

    let { body } = await request(options);

    ctx.body = body
})

// 获取门店区域
router.post('/getArea', validator({
    companyId: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers;
    const options = {
        url: 'http://sim.ctl.chelizitech.com:9901/api/simulator/area',
        method: "POST",
        form: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            'ctl-token': headers['ctl-token'],
        }
        
    }

    let { body } = await request(options);

    ctx.body = body
})

// 获取门店区域
router.post('/getDept', validator({
    areaId: { type: 'string', required: true },
    Lat: { type: 'string', required: true },
    Lng: { type: 'string', required: true },
    companyId: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers;
    const options = {
        url: 'http://sim.ctl.chelizitech.com:9901/api/simulator/dept',
        method: "POST",
        form: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            'ctl-token': headers['ctl-token'],
        }
        
    }

    let { body } = await request(options);

    ctx.body = body
})

// 获取模拟门店信息
router.post('/getRoomInfo', validator({
    roomId: { type: 'string', required: true },
    companyId: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers;
    const options = {
        url: 'http://sim.ctl.chelizitech.com:9901/api/simulator/area',
        method: "POST",
        form: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            'ctl-token': headers['ctl-token'],
        }
        
    }

    let { body } = await request(options);

    ctx.body = body
})

// 获取门店模拟机预约情况
router.post('/getAppointment', validator({
    roomId: { type: 'string', required: true },
    companyId: { type: 'string', required: true },
    stuid: { type: 'string', required: true },
    PlanDate: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers;
    const options = {
        url: 'http://sim.ctl.chelizitech.com:9901/api/simulator/GetAppointmentCount',
        method: "POST",
        form: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            'ctl-token': headers['ctl-token'],
        }
        
    }

    let { body } = await request(options);

    ctx.body = body
})

// 获取当前时段模拟机情况
router.post('/getSimulatorNumber', validator({
    companyId: { type: 'string', required: true },
    roomId: { type: 'string', required: true },
    planDate: { type: 'string', required: true },
    time: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers;
    const options = {
        url: 'http://sim.ctl.chelizitech.com:9901/api/simulator/getSimulatorNumber',
        method: "POST",
        form: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            'ctl-token': headers['ctl-token'],
        }
        
    }

    let { body } = await request(options);

    ctx.body = body
})

// 获取当前时段模拟机情况
router.post('/saveAppointment', validator({
    companyId: { type: 'string', required: true },
    userId: { type: 'string', required: true },
    stuid: { type: 'string', required: true },
    planDate: { type: 'string', required: true },
    Times: { type: 'string', required: true },
    stuName: { type: 'string', required: true },
    roomId: { type: 'string', required: true },
    mobile: { type: 'string', required: true },
    remark: { type: 'string', required: true },
    role: { type: 'string', required: true },
    simId: { type: 'string', required: true },
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers;
    const options = {
        url: 'http://sim.ctl.chelizitech.com:9901/api/simulator/SaveAppointment',
        method: "POST",
        form: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            'ctl-token': headers['ctl-token'],
        }
        
    }

    let { body } = await request(options);

    ctx.body = body
})

// 预约列表详情
router.post('/searchAppointment', validator({
    companyId: { type: 'string', required: true },
    stuid: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers;
    const options = {
        url: 'http://sim.ctl.chelizitech.com:9901/api/simulator/SearchAppointment',
        method: "POST",
        form: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            'ctl-token': headers['ctl-token'],
        }
        
    }

    let { body } = await request(options);

    ctx.body = body
})

// 取消模拟机预约
router.post('/cancelAppointment', validator({
    companyId: { type: 'string', required: true },
    Id: { type: 'string', required: true }
}), async(ctx, next) => {
    const data = ctx.request.body;
    const headers = ctx.headers;
    const options = {
        url: 'http://sim.ctl.chelizitech.com:9901/api/simulator/CancelAppointment',
        method: "POST",
        form: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            'ctl-token': headers['ctl-token'],
        }
        
    }

    let { body } = await request(options);

    ctx.body = body
})

module.exports = router;