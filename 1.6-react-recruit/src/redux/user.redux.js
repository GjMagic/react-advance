import axios from 'axios';
import { getRedirectPath } from '../util';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

// reducer, 根据老的state和action,生成新的state
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, 
        msg: '', 
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      } // 更改state
    case ERROR_MSG:
      return {
        ...state, 
        isAuth: false,
        msg: action.msg
      }
    case LOAD_DATA:
      return {...state, ...action.payload}
    case LOGOUT:
      return {...initState, redirectTo: '/login'}
    default:
      return state;
  }
}

// action creator(函数返回值的形式)
function authSuccess(data) {
  return {
    type: AUTH_SUCCESS,
    payload: data // 负载
  }
}

function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}

export function loadData(userinfo) {
  return { 
    type: LOAD_DATA, 
    payload: userinfo
  }
}

// 注销操作
export function logoutSubmit() {
  return { type: LOGOUT }
}

// 保存完善信息页面
export function update(data) { 
  return dispatch => {
    axios
      .post(
        '/user/update',
        data
      )
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          // 如果请求成功，则发布一个事件，提交action
          dispatch(authSuccess(res.data.data))
        }else {
          dispatch( errorMsg(res.data.msg) );
        }
      })
  }
}

// 注册
export function register( { user, pwd, repeatpwd, type } ) {
  if(!user || !pwd) {
    return errorMsg('用户名或密码必须输入!')
  }

  if(pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同!')
  }

  return dispatch => {
    axios
      .post(
        '/user/register',
        { user, pwd, type } 
      )
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess( // 如果请求成功，则发布一个事件，提交action
            { user, pwd, type }
          ))
        }else {
          dispatch( errorMsg(res.data.msg) );
        }
      })
  }
}

// 登录
export function login({user, pwd}) {
  if(!user || !pwd) {
    return errorMsg('用户名或密码必须输入!')
  }

  return dispatch => {
    axios
      .post(
        '/user/login',
        { user, pwd } 
      )
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))// 如果请求成功，则发布一个事件，提交action
        }else {
          dispatch( errorMsg(res.data.msg) );
        }
      })
  }
}