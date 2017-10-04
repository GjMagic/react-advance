import React, { Component } from 'react'

export default class Footer extends Component {
  
  render() {

    let {data} = this.props
    let leftNum = data.filter((item) => {
      return !item.isChecked
    }).length

    return (
      <footer className="footer">
        <span className="todo-count">
            <strong>{leftNum}</strong>
            <span> item left</span>
        </span>
        <ul className="filters">
            <li><a href="#/all" className="all">All</a></li>
            <li><a href="#/active" className="active">Active</a></li>
            <li><a href="#/completed" className="completed">Completed</a></li>
        </ul>
        <button className="clear-completed">clear all completed</button>
      </footer>
    )
  }
}