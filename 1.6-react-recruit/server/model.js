const mongoose = require('mongoose');

// 链接mongo 并且使用react-recruit这个集合
const DB_URL = 'mongodb://localhost:27017/react-recruit';
mongoose.connect(DB_URL, {useMongoClient: true});

const models = {
  user: {
    'user': { type: String, require: true },
    'pwd': { type: String, require: true },
    'type': { type: String, require: true },
    // 头像
    'avatar': {type: String},
    // 个人简介或职位简介
    'desc': {type: String},
    // 职位名
    'title': {type: String},
    // 如果你是boss，还有两个字段
    'company': {type: String},
    'money': {type: String}
  },
  chat: {}
}

for (let attr in models) {
  mongoose.model(attr, new mongoose.Schema(models[attr]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name);
  }
}
