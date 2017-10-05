import React, { Component } from 'react'
import PropTypes from 'prop-types'

// 进行属性验证
let propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  isChecked: PropTypes.bool,
  removeItemHandle: PropTypes.func,
  onToggle: PropTypes.func
}

export default class TodoItem extends Component {
  
  constructor(props) {
    super(props)
    this.removeTodoItem = this.removeTodoItem.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  removeTodoItem() {
    let {id, removeItemHandle} = this.props
    removeItemHandle(id)
  }

  // 单选
  toggle() {
    let {id, onToggle} = this.props

    // 把单选的id传给父组件
    onToggle(id)
  }

  render() {
    let {removeTodoItem, toggle} = this

    let {title, isChecked} = this.props

    let completed = isChecked ? 'completed' : ''

    return (
      <li className={completed}>
        <div className="view">
            <input 
              className="toggle" 
              type="checkbox" 
              checked={isChecked}
              onChange={toggle}
            />
            <label>{title}</label>
            <button 
              className="destroy"
              onClick={removeTodoItem}
            ></button>
        </div>
        <input className="edit" />
      </li>
    )
  }
}

TodoItem.propTypes = propTypes