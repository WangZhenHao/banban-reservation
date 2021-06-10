const fs = require('fs')
const Koa = require('koa')
const cors = require('koa2-cors')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')


const app = new Koa()
const router = new Router()

function useMiddleware() {
  app.use(helmet())
  app.use(bodyParser())

  //设置全局返回头
  app.use(cors({
    origin: function(ctx) {
      return '*'; //cors
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 86400,
    credentials: true,  // 允许携带头部验证信息
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
    allowHeaders: ['*'],
  }))
}

function useRouter(path){
    path = path || __dirname + '/routes'
    //注册路由
    let urls = fs.readdirSync(path)
    urls.forEach((element) => {
      const elementPath = path + '/' + element
      const stat = fs.lstatSync(elementPath);
      const isDir = stat.isDirectory();

      if (isDir) { // 文件夹递归注册路由
        useRouter(elementPath)
      } else {
        let module = require(elementPath)
        let routeRrefix = path.split('/routes')[1] || ''
        // console.log(elementPath, routeRrefix + '/' + element.replace('.js', ''))
        //routes里的文件名作为 路由名
        router.use(routeRrefix + '/' + element.replace('.js', ''), module.routes())
      }
    })
    //使用路由
    app.use(router.routes()).use(router.allowedMethods())
  }

async function start () {
    useMiddleware()
    useRouter()
    app.listen(3001, '127.0.0.1');
    console.log('http://127.0.0.1:3001')
}

start()