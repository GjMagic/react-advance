import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';

import NavLinkBar from '../navLink/NavLinkBar';

function Boss() { 
  return ( <h2>boss首页</h2> )
}

function Genius() { 
  return ( <h2>genius首页</h2> )
}

function Msg() { 
  return ( <h2>消息列表</h2> )
}

function User() { 
  return ( <h2>用户中心列表</h2> )
}

@connect(
  state => state
)
class Dashboard extends Component {

  render() {
    const { user } = this.props;
    const { pathname } = this.props.location;
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]

    return (
      <div>
        <NavBar mode="dark">
          {navList.find(item => item.path === pathname).title}
        </NavBar>
        <NavLinkBar navList={navList}></NavLinkBar>
      </div>
    );
  }
}

export default Dashboard;