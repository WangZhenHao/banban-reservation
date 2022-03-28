const Koa = require('koa');
const path = require('path');
const static = require('koa-static')
const app = new Koa()


app.use(static(path.join(__dirname, '../dist')));
app.listen(8001, '0.0.0.0');
console.log('static server is staring at port 8001');
