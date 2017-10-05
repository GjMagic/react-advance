import React, { Component } from 'react'
import PropTypes from 'prop-types'

let propTypes = { // 无论传过来什么属性都需要进行验证
  leftNum: PropTypes.number, 
  data: PropTypes.array,
  onClearCompleted: PropTypes.func,
  onChangeView: PropTypes.func,
  view: PropTypes.oneOf(['all', 'active', 'completed'])
}

export default class Footer extends Component {

  render() {
    let {
      leftNum, 
      data, 
      onClearCompleted, 
      onChangeView, 
      view
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
              <a 
                href="#/all" 
                className={view === 'all' ? 'selected' : ''}
                onClick={ev => onChangeView('all')}
              >All</a>
            </li>
            <li>
              <a 
                href="#/active"
                className={view === 'active' ? 'selected' : ''}
                onClick={ev => onChangeView('active')}
              >Active</a>
            </li>
            <li>
              <a 
                href="#/completed"
                className={view === 'completed' ? 'selected' : ''}
                onClick={ev => onChangeView('completed')}
              >Completed</a>
            </li>
        </ul>
        {clearButton}
      </footer>
    )
  }
}

Footer.propTypes = propTypes