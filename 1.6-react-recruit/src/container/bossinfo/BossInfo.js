import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/AvatarSelector';
class BossInfo extends Component {
  
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {

    let { onChange } = this;

    return (
      <div>
        <NavBar mode="dark">Boss完善信息页面</NavBar>
        <AvatarSelector />
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
          onChange={ val => { onChange('salary', val) } }
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
      </div>
    )
  }
}

export default BossInfo;