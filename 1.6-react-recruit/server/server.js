const express = require('express');
const userRouter = require('./user');

// 新建app
const app = express();

app.use('/user', userRouter); // 开启路由中间件
 
app.listen(9093, () => {
  console.log('node app start at port 9093');
})