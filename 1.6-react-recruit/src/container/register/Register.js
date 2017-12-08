import React, { Component } from 'react';
import Logo from '../../component/logo/Logo';
import { WingBlank, List, WhiteSpace, Button, InputItem, Radio } from 'antd-mobile';

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type: 'genius'
    }
  }
  

  render() {

    const RadioItem = Radio.RadioItem;

    let { type } = this.state;

    return (
      <div>
        <Logo />
        <WingBlank>
          <List>
            <InputItem>用户名：</InputItem>
            <WhiteSpace />
            <InputItem>密码：</InputItem>
            <WhiteSpace />
            <InputItem>确认密码：</InputItem>
            <WhiteSpace />
            <RadioItem checked={type === 'genius'}>牛人</RadioItem>
            <RadioItem checked={type === 'boss'}>Boss</RadioItem>
            <WhiteSpace />
            <Button type="primary">注册</Button>            
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
