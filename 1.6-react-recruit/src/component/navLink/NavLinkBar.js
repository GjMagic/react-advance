import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
@withRouter
class NavLinkBar extends Component {

  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render() {

    const navList = this.props.navList.filter(item => !item.hide);

    const { pathname } = this.props.location;

    return (
      <TabBar>
        {navList.map((item, i) => {
          return (
            <TabBar.Item
              key={i}
              title={item.title}
              icon={{ uri: require(`./img/${item.icon}.png`) }}
              selectedIcon={{ uri: require(`./img/${item.icon}-active.png`) }}
              selected={item.path === pathname}
              onPress={() => {
                this.props.history.push(item.path);
              }}
            >
            </TabBar.Item>
          )
        })}
      </TabBar>
    );
  }
}

export default NavLinkBar;