import React, { Component } from 'react'
import PropTypes from 'prop-types'

let propTypes = { // 属性类型验证放在外面
  imgSrc: PropTypes.string,
  name: PropTypes.string.isRequired, // isRequired表示name必须传进来
  meta: PropTypes.string,
  desc: PropTypes.string,
  joined: PropTypes.number,
  likeNum: PropTypes.number
}

export default class Card extends Component {

  render() {
    let { imgSrc, name, meta, desc, joined, likeNum } = this.props

    let {txt} = this.context  // 官网警告熟悉redux才可以用

    return (
      <div className="ui card">
        <div className="image">
          <img src={ imgSrc } alt="" />
        </div>
        <div className="content">
          <div className="header">{meta}</div>
          <div className="meta">
            <a href="">{desc}</a>
          </div>
          <div className="discription">{name}</div>
        </div>
        <div className="extra content">
          <span className="right floated">{`${txt} in ${joined}`}</span>
          <span>
            <i className="empty heart icon"></i>
            {`${likeNum} Like`}
          </span>
        </div>
      </div>
    )
  }
}

Card.contextTypes = {
  txt: PropTypes.string
}
Card.propTypes = propTypes // 定义完propTypes之后，把它挂载在propTypes上