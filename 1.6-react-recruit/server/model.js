const mongoose = require('mongoose');

// 链接mongo 并且使用recruit这个集合
const DB_URL = 'mongodb://localhost:27017/recruit';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
  console.log('mongo connect success');
})