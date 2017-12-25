const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// 新建app
const app = express();
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('user login');
})

const userRouter = require('./user');
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter); // 开启路由中间件
 
server.listen(9093, () => {
  console.log('node app start at port 9093');
})