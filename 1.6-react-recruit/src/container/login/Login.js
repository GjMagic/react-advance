import React, { Component } from 'react';
import Logo from '../../component/logo/Logo';
import { WingBlank, WhiteSpace, Button, List, InputItem } from 'antd-mobile';

class Login extends Component {
  
  constructor(props) {
    super(props)
    this.register = this.register.bind(this);
  }
  
  // 跳转到注册页面
  register() {
    // 因为是路由组件，所以在this.props下有history(router 4 和 3的不同处)
    this.props.history.push('./register');
  }

  render() {
    
    let { register } = this;

    return (
      <div>
        <Logo />
        <WingBlank>
          <List>
            <InputItem>用户：</InputItem>
            <WhiteSpace />
            <InputItem>密码：</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary">登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={register}>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
