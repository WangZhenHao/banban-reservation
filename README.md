# 斑斑驾道练车自动预约系统

>该服务器预计2022年3月1号过期，请留意时间！
>建议把代码克隆下载，在本地运行，线上服务器内存小，运行可能比较卡顿

网站地址：[http://18.224.19.73:3002/#/home](http://18.224.19.73:3002/#/home)

![图片](https://github.com/WangZhenHao/banban-reservation/raw/master/build/websize.jpg)
![图片](https://github.com/WangZhenHao/banban-reservation/raw/master/build/websize2.jpg)

### 注意事项：

```
科目二：
1：基础课可以通过系统自动预约，最高10节课，自由科和加强科是教练安排的，无法通过系统预约
2：预约的时候，确保账号没有在其他地方登录，否则预约会失败


```

### 项目介绍：

```
项目前后端分离，都是使用node来实现

前端：
vue-cli4.5 + vue2 + vuex + axios + elementUi + vue-router

使用：
// 安装依赖
npm i
// 本地开发
npm run dev
// 构建
npm run build
// 静态资源访问服务
npm run pm2:server


后台：
koa2 + pm2 + request

// 安装依赖
npm i
// 启动后台服务
npm run server

```

## To-do 
>已完成事项
- [x] 登录
- [x] 查看练车记录
- [x] 自定义预约任务
- [x] 查看教练课程安排
- [x] 当天预约
- [x] 模拟机预约

>代办事项
- [ ] 科目三的预约
- [ ] 取消练车


## QQ交流群 475870039