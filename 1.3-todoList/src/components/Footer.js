import React, { Component } from 'react'

export default class Footer extends Component {
  
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
            <strong>0</strong>
            <span>条未选中</span>
        </span>
        <ul className="filters">
            <li><a href="" className="all">全部</a></li>
            <li><a href="" className="active">未选中</a></li>
            <li><a href="" className="completed">选中</a></li>
        </ul>
      </footer>
    )
  }
}