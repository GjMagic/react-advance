import React, { Component } from 'react';
import Logo from '../../component/logo/Logo';
import { WingBlank, WhiteSpace, Button, List, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/user.redux';

@connect(
  state => state.user,
  { login }
)
class Login extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  
  // 跳转到注册页面
  register() {
    // 因为是路由组件，所以在this.props下有history(router 4 和 3的不同处)
    this.props.history.push('./register');
  }

  // 表单的onChange事件
  handleChange(type, val) {
    this.setState({
      [type]: val
    })
  }

  // 点击登录按钮
  handleLogin() {
    this.props.login(this.state)    
  }
  render() {
    
    let { register, handleChange, handleLogin } = this;

    let { msg, redirectTo } = this.props;

    return (
      <div>
        { redirectTo ? <Redirect to={redirectTo} /> : null}
        <Logo />
        <WingBlank>
        { msg ? <p className="error-msg">{msg}</p> : null}
          <List>
            <InputItem
              onChange={ val => handleChange('user', val) }
            >用户：</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={ val => handleChange('pwd', val) }
            >密码：</InputItem>
          </List>
          <WhiteSpace />
          <Button 
            type="primary"
            onClick={ handleLogin }
          >登录</Button>
          <WhiteSpace />
          <Button 
            type="primary" 
            onClick={ register }
          >注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
