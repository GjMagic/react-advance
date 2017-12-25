import React, { Component } from 'react';
import { List, InputItem } from 'antd-mobile';
import io from 'socket.io-client';

const socket = io('ws://localhost:9093');

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    const { msg } = this.state;
    socket.on('recvmsg', (data) => {
      this.setState({
        msg: [...msg, data.text]
      })
    })
  }
  
  handleSubmit() {
    const { text } = this.state;
    socket.emit('sendmsg', { text }) // 发布事件到后端
    this.setState({
      text: ''
    })
  }

  render() {
    // this.props.match(命中).params(参数).user(参数名)
    const { handleSubmit } = this;
    const { text, msg } = this.state;

    return (
      <div>
        { msg.map((item, i) => (
          <p key={i}>{item}</p>
        )) }
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={text}
              onChange={val => {
                this.setState({
                  text: val
                })
              }}
              extra={<span onClick={handleSubmit}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    );
  }
}

export default Chat;