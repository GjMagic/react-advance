const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

// 新建app
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter); // 开启路由中间件
 
app.listen(9093, () => {
  console.log('node app start at port 9093');
})