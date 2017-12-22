import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import browerCookies from 'browser-cookies';
import { Result, List, WhiteSpace, Modal, Button } from 'antd-mobile';

import { logoutSubmit } from '../../redux/user.redux';
@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  // 退出登录
  logout() {
    const alert = Modal.alert;
    alert('注销', '确认退出登陆吗？', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        browerCookies.erase('userid'); // 清除cookie
        this.props.logoutSubmit();
        //window.location.href = window.location.href; //强制刷新页面
      } }
    ]);
  }

  render() {
    const { logout } = this;
    const { 
      avatar, user, type, company, title, desc, money, redirectTo 
    } = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;

    return user ? (
      <div>
        <Result
          img={<img src={require(`../img/${avatar}.png`)} alt="avatar" />}
          title={user}
          message={type === 'boss' ? company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item
            multipleLine
          >
            {title}
            {desc.split('\n').map((item, i) => <Brief key={i}>{item}</Brief>)}
            {money ? <Brief>薪资：{money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <List onClick={logout}>
          <Button type="warning">退出登录</Button>
        </List>
      </div>
    ) : <Redirect to={redirectTo} />
  }
}

export default User;