import React, { Component } from 'react';
import './common/style/base.css'
import './common/style/index.css'

import Header from './components/Header'
import Footer from './components/Footer'
import TodoItem from './components/TodoItem'

let data = [
  {
    id: 1,
    title: '世界那么大',
    isChecked: false 
  },
  {
    id: 2,
    title: '我想去看看',
    isChecked: false 
  },
  {
    id: 3,
    title: '想都别想！',
    isChecked: false 
  }
]

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data
    }
    this.changeDataHandle = this.changeDataHandle.bind(this)
    this.removeItemHandle = this.removeItemHandle.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
    this.onToggle = this.onToggle.bind(this)
    this.onClearCompleted = this.onClearCompleted.bind(this)
    this.onEdit = this.onEdit.bind(this)
  }
  
  // 通知父组件val的变化
  changeDataHandle(val) {
    let t = Date.now()
    val = val.trim()
    let {data} = this.state
    if(val === '') return; 
    
    // 添加value
    data.push({
      id: t,
      title: val,
      isChecked: false
    })

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

  // 编辑的回调函数
  onEdit(id, val) {
    let {data} = this.state
    data.forEach((item) => {
      if(item.id === id) {
        item.title = val
      }
    })
    this.setState({data})
  }

  render() {
    let {
      changeDataHandle, 
      removeItemHandle, 
      toggleAll,
      onToggle,
      onClearCompleted,
      onEdit
    } = this

    let {data} = this.state

    // 未选中的个数
    let leftNum = data.filter((item) => {
      return !item.isChecked
    }).length

    let todoItems = null,
        main = null,
        footer = null

    /* let { match:{url} } = this.props */
    let { location:{pathname} } = this.props // 获取路径信息

    // 通过view过滤数据
    data = data.filter((item) => {
      switch (pathname) {
        case '/active':
          return !item.isChecked;
        case '/completed':
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
                      onToggle,
                      onEdit
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
        pathname
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
