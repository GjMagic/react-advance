import React, { Component } from 'react';
import './common/style/base.css'
import './common/style/index.css'

import Header from './components/Header'
import Footer from './components/Footer'
import TodoItem from './components/TodoItem'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      checkAll: false
    }
    this.changeDataHandle = this.changeDataHandle.bind(this)
    this.removeItemHandle = this.removeItemHandle.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
    this.changeChecked = this.changeChecked.bind(this)
  }
  

  // 通知父组件data的变化
  changeDataHandle(data) {
    this.setState({
      data
    })
  }

  // 删除TodoItem的回调函数
  removeItemHandle(id) {
    let {data} = this.state
    let newData = data.filter((item) => {
      return item.id !== id
    })

    this.setState({
      data: newData
    })
  }

  // 全选按钮onChange
  changeChecked(ev) {
    let check = ev.target.checked
    this.setState({
      checkAll: check
    })
  }

  // 全选
  toggleAll() {
    let {data, checkAll} = this.state
    data.forEach((item) => {
      item.isChecked = !checkAll
    })

    this.setState({
      data
    })
  }

  render() {
    let {
      changeDataHandle, 
      removeItemHandle, 
      toggleAll, 
      changeChecked
    } = this

    let {data} = this.state

    let leftNum = data.filter((item) => {
      return !item.isChecked
    }).length

    return (
      <section className="todoapp">
        <Header 
          data={data} 
          changeDataHandle={changeDataHandle}
        />
        <section className="main">
            <input 
              className="toggle-all" 
              type="checkbox"
              checked={leftNum === 0}
              onChange={changeChecked} 
              onClick={toggleAll}
            />
            <ul className="todo-list">
                {
                  data.map((item,i) => {
                    return <TodoItem 
                      {...item}
                      data={data} 
                      key={i}
                      removeItemHandle={removeItemHandle}
                    />
                  })
                }
            </ul>
        </section>
        <Footer data={data} />
      </section>
    );
  }
}

export default App;
