import React, { Component } from 'react'

export default class Nav extends Component {
  
  render() {

    let {changeView} = this.props

    return (
      <div className="ui menu">
        <div 
          className="item"
          onClick={ () => { changeView('noods') } }
        >Noods</div>
        <div 
          className="item"
          onClick={ () => { changeView('home') } } // 子组件向父组件通信时，子组件需要执行父组件传过来的回调函数
        >Home</div>
        <div 
          className="item"
          onClick={ () => { changeView('list') } }
        >List</div>
        <div className="item right">Login</div>
      </div>
    )
  }
}