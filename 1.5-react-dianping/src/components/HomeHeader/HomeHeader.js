import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class HomeHeader extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  
  render() {
    return (
      <div>
        <header className="home_header clearfix">
          <div className="fl city_select">
            <Link to="/city">{this.props.cityName}</Link>
            <i className="iconfont icon-down"></i>
          </div>
          <div className="fl search">
            <i className="iconfont icon-search"></i>
            <input placeholder="输入关键字..." className="search_input" />
          </div>
          <div className="fr">
            <i className="iconfont icon-yonghu"></i> 
          </div>
        </header>
      </div>
    );
  }
}

export default HomeHeader;