import axios from 'axios';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
  isAuth: false, // 用户是否注册成功
  msg: '',
  user: '',
  pwd: '',
  type: ''
}

// reducer, 根据老的state和action,生成新的state
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', isAuth: true, ...action.payload} // 更改state
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state;
  }
}

// action creator(函数返回值的形式)
function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data // 负载
  }
}

function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
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
          dispatch(registerSuccess( // 如果请求成功，则发布一个事件，提交action
            { user, pwd, type }
          ))
        }else {
          dispatch( errorMsg(res.data.msg) );
        }
      })
  }
}