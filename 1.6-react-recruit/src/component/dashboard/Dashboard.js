import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import { getMsgList, recvMsg } from '../../redux/chat.redux'; 

import NavLinkBar from '../navLink/NavLinkBar';
import Boss from '../Boss/Boss';
import Genius from '../Genius/Genius';
import User from '../User/User';

function Msg() { 
  return ( <h2>消息列表</h2> )
}

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class Dashboard extends Component {
  
  componentDidMount() {
    this.props.getMsgList();
    this.props.recvMsg();
  }
  
  render() {
    const { user } = this.props;
    const { pathname } = this.props.location;
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息',
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
        <NavBar className="fixd-header" mode="dark">
          {navList.find(item => item.path === pathname).title}
        </NavBar>
        <div>
          <Switch>
            {navList.map((item, i) => (
              <Route key={i} path={item.path} component={item.component}/>
            ))}
          </Switch>
        </div>
        <NavLinkBar navList={navList}></NavLinkBar>
      </div>
    );
  }
}

export default Dashboard;