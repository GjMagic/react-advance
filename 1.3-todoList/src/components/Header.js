import React, { Component } from 'react'
import PropTypes from 'prop-types'

let propTypes = {
  changeDataHandle: PropTypes.func
}

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      val: ''
    }
    this.addTodoItem = this.addTodoItem.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }

  changeValue(ev) {
    this.setState({
      val: ev.target.value
    })
  }

  // 添加TodoItem
  addTodoItem(ev) {
    if(ev.keyCode === 13) {
      let {val} = this.state
      let {changeDataHandle} = this.props

      this.setState({
        val: '' // 清空value值
      })

      changeDataHandle(val)
    }
  }

  render() {
    let {addTodoItem, changeValue} = this
    let {val} = this.state

    return (
      <header className="header" >
        <h1>todos</h1>
        <input 
          className="new-todo" 
          placeholder="请输入内容" 
          value={val}
          onChange={changeValue}
          onKeyDown={addTodoItem}
        />
      </header>
    )
  }
}

Header.propTypes = propTypes