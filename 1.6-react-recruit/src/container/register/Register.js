import React, { Component } from 'react';
import Logo from '../../component/logo/Logo';
import { WingBlank, List, WhiteSpace, Button, InputItem, Radio } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';

@connect( // react-redux自动把数据和方法放在props里
  state => state.user, // 数据
  { register } // 方法, 自动dispatch
)
class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type: 'genius',
      user: '',
      pwd: '',
      repeatpwd: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  
  // 当输入用户名、密码、确认密码时
  handleChange(type, val) {
    this.setState({
      [type]: val
    })
  }

  // 点击注册按钮
  handleRegister() {
    this.props.register(this.state)
  }

  render() {

    const RadioItem = Radio.RadioItem;
    let { handleChange, handleRegister } = this;
    let { msg } = this.props;
    let { type } = this.state;

    return (
      <div>
        <Logo />
        <WingBlank>
          { msg ? <p className="error-msg">{msg}</p> : null}
          <List>
            <InputItem
              onChange={ val => handleChange('user', val) }
            >用户名：</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"    
              onChange={ val => handleChange('pwd', val) }
            >密码：</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"    
              onChange={ val => handleChange('repeatpwd', val) }
            >确认密码：</InputItem>
            <WhiteSpace />
            <RadioItem 
              checked={ type === 'genius' }
              onClick={ () => handleChange('type', 'genius') }
            >牛人</RadioItem>
            <RadioItem 
              checked={ type === 'boss' }
              onClick={ () => handleChange('type', 'boss') }
            >Boss</RadioItem>
            <WhiteSpace />
            <Button 
              type="primary"
              onClick={ handleRegister }
            >注册</Button>            
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
