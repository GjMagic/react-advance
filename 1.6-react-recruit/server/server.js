const express = require('express');
const mongoose = require('mongoose');

// 新建app
const app = express();

// 链接mongo 并且使用recruit这个集合
const DB_URL = 'mongodb://localhost:27017/recruit';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
  console.log('mongo connect success');
})

// 数据模型
const User = mongoose.model('user', new mongoose.Schema({
  user: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  }
}))

// 增加数据
/* User.create({
  user: 'leo',
  age: 20
}, (err, doc) => {
  if (!err) {
    console.log(doc)
  }else {
    console.log(err)
  }
}) */

// 删除数据
/* User.remove({user: 'jack'}, (err, doc) => {
  console.log(doc)
}) */
 
// 更新数据
/* User.update({user: 'jack'}, {'$set': {age: 24}}, (err, doc) => {
  console.log(doc);
}) */

app.get('/', (req, res) => {
  res.send('<h1>Hello World !</h1>');
})

app.get('/data', (req, res) => {
  // 查找数据
  User.findOne({user: 'ted'}, (err, doc) => { // find里面第一个参数是{}时，是找到所有数据
    res.json(doc)
  })
})

app.listen(9000, () => {
  console.log('node app start at port 9000');
})