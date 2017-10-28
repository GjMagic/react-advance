import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';


import './style.less';

class Category extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    console.log()
  }
  
  render() {
    return (
      <div className="category_wrapp clearfix">
        <Link to="/">
          <div></div>
          <h3>日本菜</h3>
        </Link>
        <Link to="/">
          <div></div>
          <h3>SPA</h3>
        </Link>
        <Link to="/">
          <div></div>
          <h3>结婚</h3>
        </Link>
        <Link to="/">
          <div></div>
          <h3>学习培训</h3>
        </Link>
        <Link to="/">
          <div></div>
          <h3>西餐</h3>
        </Link>
        <Link to="/">
          <div></div>
          <h3>火车机票</h3>
        </Link>
        <Link to="/">
          <div></div>
          <h3>烧烤</h3>
        </Link>
        <Link to="/">
          <div></div>
          <h3>家装</h3>
        </Link>
        <Link to="/">
          <div></div> 
          <h3>宠物</h3>
        </Link>
        <Link to="/">
          <div></div>
          <h3>全部分类</h3>
        </Link>
      </div>
    );
  }
}

export default Category;