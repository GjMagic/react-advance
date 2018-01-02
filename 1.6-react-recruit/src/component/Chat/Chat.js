import React, { Component } from 'react';
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
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
    if (this.props.chat.chatmsg.length) return;
    this.props.getMsgList();
    this.props.recvMsg();
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
    const { text } = this.state;
    const { chat } = this.props;
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;

    if(!users[userid]) return null;
    return (
      <div id="chat-page">
        <NavBar 
          icon={<Icon type="left" />}
          mode="dark"
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >
          {users[userid].name}
        </NavBar>
        { chat.chatmsg.map((item, i) => {
          const avatarF = require(`../img/${users[item.from].avatar}.png`)
          const avatarT = require(`../img/${users[item.to].avatar}.png`)
          return (
            item.from === userid 
            ? (
              <List key={i}>
                <List.Item
                  thumb={avatarF}
                >{item.content}</List.Item>
              </List>
            )
            : (
              <List key={i}>
                <List.Item
                  className="chat-me"
                  extra={<img src={avatarT} alt="avatar" />}
                >{item.content}</List.Item>
              </List>
            )
          )
        }) }
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