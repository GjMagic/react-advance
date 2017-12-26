import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093'); // 跨域

const MSG_LIST = 'MSG_LIST'; // 消息列表
const MSG_RECV = 'MSG_LIST'; // 读取消息
const MSG_READ = 'MSG_LIST'; // 标识已读

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
      return {}
    case MSG_READ:
      return {}
    default:
      return state
  }
}

// action creator
function msgList(msgs) {
  return { type: MSG_LIST, payload: msgs }
}

export function getMsgList() {
  return dispatch => {
    axios
    .get('/user/getmsglit')
    .then(res => {
      if(res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgs))
      }
    })
  }
}