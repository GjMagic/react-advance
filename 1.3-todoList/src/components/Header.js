import React, { Component } from 'react'
import PropTypes from 'prop-types'

let propTypes = {
  data: PropTypes.array,
  changeDataHandle: PropTypes.func
}

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
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
      let t = Date.now()
      let {data, val} = this.state
      val = val.trim()
      let {changeDataHandle} = this.props

      if(val === '') return; 

      // 添加value
      data.push({
        id: t,
        title: val,
        isChecked: false
      })

      this.setState({
        data,
        val: '' // 清空value值
      })

      changeDataHandle(data)
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