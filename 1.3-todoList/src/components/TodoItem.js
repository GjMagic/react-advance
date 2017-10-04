import React, { Component } from 'react'
import PropTypes from 'prop-types'

// 进行属性验证
let propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  isChecked: PropTypes.bool,
  removeItemHandle: PropTypes.func
}

export default class TodoItem extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      isChecked: props.isChecked
    }
    this.removeTodoItem = this.removeTodoItem.bind(this)
    this.changeToggle = this.changeToggle.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  removeTodoItem() {
    let {id, removeItemHandle} = this.props
    removeItemHandle(id)
  }

  // 单选的onChange
  changeToggle(ev) {
    let check = ev.target.checked
    this.setState({ // 异步
      isChecked: check
    })
  }

  // 单选
  toggle() {
    let {isChecked, id} = this.props
    let {data} = this.props
    data.forEach((item) => {
      if(item.id === id) {
        item.isChecked = !isChecked
      }
    })
    this.setState({
      data
    })
  }

  render() {
    let {removeTodoItem, changeToggle, toggle} = this

    let {isChecked} = this.props

    let {title} = this.props

    let completed = isChecked ? 'completed' : ''

    return (
      <li className={completed}>
        <div className="view">
            <input 
              className="toggle" 
              type="checkbox" 
              checked={isChecked}
              onChange={changeToggle}
              onClick={toggle}
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