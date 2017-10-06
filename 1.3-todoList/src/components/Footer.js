import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

let propTypes = { // 无论传过来什么属性都需要进行验证
  leftNum: PropTypes.number, 
  data: PropTypes.array,
  onClearCompleted: PropTypes.func,
  pathname: PropTypes.string
}

export default class Footer extends Component {

  render() {
    let {
      leftNum, 
      data, 
      onClearCompleted,
      pathname
    } = this.props

    let clearButton = null;

    if(leftNum !== data.length) {
      clearButton = (
        <button 
          className="clear-completed"
          onClick={onClearCompleted}
        >
          clear all completed
        </button> 
      )
    }

    return (
      <footer className="footer">
        <span className="todo-count">
            <strong>{leftNum}</strong>
            <span> item left</span>
        </span>
        <ul className="filters">
            <li>
              <Link 
                to="/" 
                className={pathname === '/' ? 'selected' : ''}
              >All</Link>
            </li>
            <li>
              <Link 
                to="/active" 
                className={pathname === '/active' ? 'selected' : ''}
              >Active</Link>
            </li>
            <li>
              <Link 
                to="/completed" 
                className={pathname === '/completed' ? 'selected' : ''}
              >Completed</Link>
            </li>
        </ul>
        {clearButton}
      </footer>
    )
  }
}

Footer.propTypes = propTypes