const express = require('express');
const Router = express.Router();
const model = require('./model');
const utils = require('utility');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = {'pwd': 0, '__v': 0};

/* Chat.remove({}, (err, doc) => {

}) */

Router.get('/list', (req, res) => {
  const { type } = req.query;
  /* User.remove({}, (err, doc) => {}) */ // 删除数据 
  User.find({type}, function(err, doc) {
    return res.json({code: 0, data: doc});
  })
})

Router.get('/getmsglist', (req, res) => {
  const user = req.cookies.userid;

  User.find({}, (err, userdoc) => {
    let users = {};
    userdoc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar }
    });
    Chat.find({'$or': [{from: user}, {to: user}]}, (err, doc) => {
      if(!err) {
        return res.json({ code: 0, msgs: doc, users })
      }
    })
  })
})

Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body;
  User.findOne({user}, (err, doc) => {
    if(doc) {
      return res.json( {code: 1, msg: '用户名重复！'} )
    }

    const userModel = new User({ user, pwd: md5Pwd(pwd), type })
    userModel.save((err, doc) => {
      if(err) {
        return res.json({ code: 1, msg: '后端出错了！' })
      }
      const { user, type, _id } = doc;
      res.cookie('userid', _id);
      return res.json({ code: 0, data: {user, type, _id} })
    })
  })
})

Router.post('/update', (req, res) => {
  const userid = req.cookies.userid;
  if(!userid) {
    return json.dumps({ code: 1 })
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data })
  })
}) 

Router.post('/login', (req, res) => {
  const { user, pwd } = req.body;
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
    if(!doc) {
      return res.json( {code: 1, msg: '用户名或密码错误！'} )
    }
    res.cookie('userid', doc._id)
    return res.json( { code: 0, data: doc } )
  })
})

// 两层md5加salt
function md5Pwd(pwd) {
  const salt = 'react-recruit_7757x8yasd7!@#HDJ~~';
  return utils.md5(utils.md5(pwd + salt));
}

Router.get('/info', (req, res) => {
  const { userid } = req.cookies;
  if(!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, (err, doc) => {
    if(err) {
      return res.json({ code: 1, msg: '后端出错了' })
    }
    if(doc) {
      return res.json({ code: 0, data: doc })
    }
  })
})

module.exports = Router