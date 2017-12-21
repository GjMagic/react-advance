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
class GeniusInfo extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: ''
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
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        <AvatarSelector 
          selectorAvatarHandle={selectorAvatarHandle}
        />
        <InputItem
          onChange={ val => { onChange('title', val) } }
        >
          求职岗位
        </InputItem>
        <TextareaItem 
          onChange={ val => { onChange('desc', val) } }
          rows={3}
          autoHeight
          title='个人简介'
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

export default GeniusInfo;