import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends Component {

  static propTypes = {
    selectorAvatarHandle: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      avatarIcon: '',
      avatarText: ''
    }
    this.selectorAvatar = this.selectorAvatar.bind(this);
  }
  
  selectorAvatar(ele) {
    this.setState({
      avatarIcon: ele.icon,
      avatarText: ele.text
    })
    this.props.selectorAvatarHandle(ele.text);
  }

  render() {

    let { selectorAvatar } = this;

    let { avatarIcon, avatarText } = this.state;

    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                    .split(',')
                    .map((item) => ({
                      //图片不能直接引入，使用webpack来引入图片
                      icon: require(`../img/${item}.png`),
                      text: item
                    }))
    const gridHeader = avatarText 
                        ? (
                          <div>
                            <span>已选择头像</span>
                            <img style={ {width: 20} } src={avatarIcon} alt="" />
                          </div>
                        )
                        : '请选择头像'
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid 
            data={avatarList} 
            onClick={ selectorAvatar }
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector;