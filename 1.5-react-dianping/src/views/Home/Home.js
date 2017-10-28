import React, { Component } from 'react';

import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Category from '../../components/Category/Category';

import './style.less';

class Home extends Component {
  render() {
    return (
      <div>
        <HomeHeader cityName={'北京'} />
        <Category />
      </div>
    );
  }
}
export default Home;