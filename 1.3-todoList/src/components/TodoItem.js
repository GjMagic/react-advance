import React, { Component } from 'react'
import PropTypes from 'prop-types'

// 进行属性验证
let propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  isChecked: PropTypes.bool,
  removeItemHandle: PropTypes.func,
  onToggle: PropTypes.func,
  onEdit: PropTypes.func
}

export default class TodoItem extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      val: this.props.title
    }
    this.removeTodoItem = this.removeTodoItem.bind(this)
    this.toggle = this.toggle.bind(this)
    this.editTodoItem = this.editTodoItem.bind(this)
    this.editText = this.editText.bind(this)
    this.editDone = this.editDone.bind(this)
    this.editKeyDone = this.editKeyDone.bind(this)
    this.editCommon = this.editCommon.bind(this)
  }

  // 删除
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

  // 编辑双击事件
  editTodoItem() {
    this.preText = this.props.title
    this.setState({
      isEdit: true
    },() => {
      this.textInput.focus()
    })
  }

  // edit的onChange事件
  editText(ev) {
    let {value} = ev.target
    this.setState({
      val: value
    })
  }

  // edit的公共函数
  editCommon() {
    let {val} = this.state
    let {id, onEdit} = this.props
    this.setState({
      /* isEdit: ！isEdit */ // 不能取相反值，会影响enter键时的操作
      isEdit: false
    })

    if(val) {
      onEdit(id, val)
    }
  }

  // 失去焦点
  editDone() {
    this.editCommon()
  }

  // 按enter键失去焦点
  editKeyDone(ev) {
    if(ev.keyCode === 13){
      this.editCommon()
    }else if(ev.keyCode === 27){
      let preText = this.preText
      this.setState({
        isEdit: false,
        val: preText
      })
      /* onEdit(id, preText) */ // 只是在子组件改变状态，所以不用通知父组件
    }
    
  }

  render() {
    let {
      removeTodoItem, 
      toggle, 
      editTodoItem, 
      editText, 
      editDone,
      editKeyDone
    } = this

    let {title, isChecked} = this.props

    let {isEdit, val} = this.state

    let completed = isChecked ? 'completed' : ''

    let editing = isEdit ? 'editing' : '' 

    return (
      <li className={completed + ' ' + editing}>
        <div className="view">
            <input 
              className="toggle" 
              type="checkbox" 
              checked={isChecked}
              onChange={toggle}
            />
            <label
              onDoubleClick={editTodoItem}
            >{title}</label>
            <button 
              className="destroy"
              onClick={removeTodoItem}
            ></button>
        </div>
        <input 
          className="edit" 
          ref={input => {this.textInput = input}}
          value={val}
          onChange={editText}
          onBlur={editDone}
          onKeyDown={editKeyDone}
        />
      </li>
    )
  }
}

TodoItem.propTypes = propTypes