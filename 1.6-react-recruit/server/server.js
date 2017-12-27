const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./model');
const Chat = model.getModel('chat');
// 新建app
const app = express();
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  socket.on('sendmsg', (data) => {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    // { chatid, from, to, content: msg }
    Chat.create({ chatid, from, to, content: msg }, (err, doc) => {
      io.emit('recvmsg', Object.assign({}, doc._doc)) // 发布事件到前端
    })
  })
})

const userRouter = require('./user');
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter); // 开启路由中间件
 
server.listen(9093, () => {
  console.log('node app start at port 9093');
})