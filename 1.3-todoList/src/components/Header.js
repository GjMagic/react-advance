import React, { Component } from 'react'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      val: ''
    }
    this.addTodoItem = this.addTodoItem.bind(this)
    this.addItemValue = this.addItemValue.bind(this)
    this.changeDataHandle = this.changeDataHandle.bind(this)
  }

  // value的onChange事件
  addItemValue(ev) {
    let val = ev.target.value
    this.setState({
      val
    })
  }

  // 添加TodoItem
  addTodoItem(ev) {
    if(ev.keyCode === 13) {
      let t = Date.now()
      let val = ev.target.value
      let {data} = this.state

      // 添加value
      data.push({
        id: t,
        title: val,
        isChecked: false
      })

      this.setState({
        data
      })
      console.log(data)
    }
  }

  // 通知父组件data的变化
  changeDataHandle() {
    console.log(123)
  }

  render() {

    let {val} = this.state

    return (
      <header className="header" >
        <h1>todos</h1>
        <input 
          className="new-todo" 
          placeholder="请输入内容" 
          value={val}
          onChange={this.addItemValue} 
          onKeyDown={this.addTodoItem}
          changeDataHandle={this.changeDataHandle}
        />
      </header>
    )
  }
}