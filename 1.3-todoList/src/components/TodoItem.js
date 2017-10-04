import React, { Component } from 'react'

export default class TodoItem extends Component {
  
  render() {

    let {title} = this.props

    return (
      <li className="completed">
        <div className="view">
            <input className="toggle" type="checkbox" />
            <label>{title}</label>
            <button className="destroy"></button>
        </div>
        <input className="edit" />
      </li>
    )
  }
}