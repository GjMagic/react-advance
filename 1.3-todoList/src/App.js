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
      view: 'all'
    }
    this.changeDataHandle = this.changeDataHandle.bind(this)
    this.removeItemHandle = this.removeItemHandle.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
    this.onToggle = this.onToggle.bind(this)
    this.onClearCompleted = this.onClearCompleted.bind(this)
    this.onChangeView = this.onChangeView.bind(this)
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
    data = data.filter((item) => {
      return item.id !== id
    })

    this.setState({
      data
    })
  }

  // 删除所有被选中的
  onClearCompleted() {
    let {data} = this.state
    let newData = data.filter((item) => {
      return !item.isChecked
    })

    this.setState({
      data: newData
    })
  }

  // 全选
  toggleAll(ev) {
    let {checked} = ev.target // 单选按钮的状态根据全选按钮的状态的改变而改变
    let {data} = this.state
    data.forEach((item) => {
      item.isChecked = checked
    })

    this.setState({
      data
    })
  }

  // 单选的回调函数
  onToggle(id) {
    let {data} = this.state
    data.forEach((item) => {
      if(item.id === id) {
        item.isChecked = !item.isChecked
      }
    })
    this.setState({data})
  }

  // 改变view
  onChangeView(view) {
    this.setState({view})
  }

  render() {
    let {
      changeDataHandle, 
      removeItemHandle, 
      toggleAll,
      onToggle,
      onClearCompleted,
      onChangeView
    } = this

    let {data, view} = this.state

    // 未选中的个数
    let leftNum = data.filter((item) => {
      return !item.isChecked
    }).length

    let todoItems = null,
        main = null,
        footer = null

    // 通过view过滤数据
    data = data.filter((item) => {
      switch (view) {
        case 'active':
          return !item.isChecked;
        case 'completed':
          return item.isChecked;
        default:
          return true
      }
    })

    // <TodoItem />
    todoItems = data.map((item,i) => {
                  return <TodoItem 
                    {...item}
                    key={i}
                    {...{ // 自定义属性合并方式
                      removeItemHandle,
                      onToggle
                    }}
                  />
                })

    // 数据为0时，main不显示            
    if(data.length) {
      main = (<section className="main">
              <input 
                className="toggle-all" 
                type="checkbox"
                checked={leftNum === 0}
                onChange={toggleAll} // 全选按钮的状态通过onChange改变即可
              />
              <ul className="todo-list">
                {todoItems}
              </ul>
            </section>);
      
    }

    // <Footer />
    footer = (<Footer 
      {...{
        data,
        leftNum,
        onClearCompleted,
        onChangeView,
        view
      }} 
    />);

    return (
      <section className="todoapp">
        <Header 
          {...{
            data,
            changeDataHandle
          }}
        />
        {main}
        {footer}
      </section>
    );
  }
}

export default App;
