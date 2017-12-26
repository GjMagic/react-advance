import React, { Component } from 'react';
import { List, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'; 

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
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
    this.props.getMsgList();
    this.props.recvMsg();
    /* socket.on('recvmsg', (data) => {
      this.setState({
        msg: [...this.state.msg, data.text]
      })
    }) */
  }
  
  handleSubmit() {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({from, to, msg})
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