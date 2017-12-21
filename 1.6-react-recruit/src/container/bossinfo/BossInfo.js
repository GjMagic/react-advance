import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AvatarSelector from '../../component/avatar-selector/AvatarSelector';
import { update } from '../../redux/user.redux';

@connect(
  state => state.user,
  { update }
)
class BossInfo extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: ''
    }
    this.onChange = this.onChange.bind(this);
    this.selectorAvatarHandle = this.selectorAvatarHandle.bind(this);
  }
  
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  selectorAvatarHandle(text) {
    this.setState({
      avatar: text
    })
  }

  render() {

    let { onChange, selectorAvatarHandle } = this;

    let { update, redirectTo, location } = this.props;

    let path = location.pathname;

    return (
      <div>
        { redirectTo && path !== redirectTo ? <Redirect to={ redirectTo } /> : null }
        <NavBar mode="dark">Boss完善信息页面</NavBar>
        <AvatarSelector 
          selectorAvatarHandle={selectorAvatarHandle}
        />
        <InputItem
          onChange={ val => { onChange('title', val) } }
        >
          职位招聘
        </InputItem>
        <InputItem
          onChange={ val => { onChange('company', val) } }
        >
          公司名称
        </InputItem>
        <InputItem
          onChange={ val => { onChange('money', val) } }
        >
          职位薪资
        </InputItem>
        <TextareaItem 
          onChange={ val => { onChange('desc', val) } }
          rows={3}
          autoHeight
          title='职位要求'
        >
        </TextareaItem>
        <Button 
          type="primary"
          onClick={ () => { update(this.state) } }
        >保存</Button>
      </div>
    )
  }
}

export default BossInfo;