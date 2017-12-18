import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';

class NavLinkBar extends Component {

  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render() {

    const navList = this.props.navList.filter(item => !item.hide);

    return (
      <div>
        {navList.map((item, i) => {
          return (
            <TabBar.Item
              key={i}
              title={item.title}
            >
            </TabBar.Item>
          )
        })}
      </div>
    );
  }
}

export default NavLinkBar;