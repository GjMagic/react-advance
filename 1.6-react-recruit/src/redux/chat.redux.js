import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093'); // 解决跨域

const MSG_LIST = 'MSG_LIST'; // 消息列表
const MSG_RECV = 'MSG_RECV'; // 读取消息
const MSG_READ = 'MSG_READ'; // 标识已读

const initState = {
  chatmsg: [],
  unread: 0
}
// reducer
export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state, 
        chatmsg: action.payload, 
        unread: action.payload.filter(item => !item.read).length
      }
    case MSG_RECV:
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload] 
      }
    case MSG_READ:
      return {}
    default:
      return state
  }
}

// action creator(返回的必须是对象或者函数)
function msgList(msgs) {
  return { type: MSG_LIST, payload: msgs }
}

function msgRecv(msg) {
  return { type: MSG_RECV, payload: msg }
}

export function recvMsg() {
  return dispatch => {
    socket.on('recvmsg', (data) => {
      dispatch(msgRecv(data));
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg })
  }
}

export function getMsgList() {
  return dispatch => {
    axios
    .get('/user/getmsglist')
    .then(res => {
      if(res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgs))
      }
    })
  }
}