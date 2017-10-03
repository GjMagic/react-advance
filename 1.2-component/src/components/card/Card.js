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

  constructor(props) {
    super(props)
    this.state = {
      isHeartOn: false,
      year: props.joined
    }

    this.heartToggle = this.heartToggle.bind(this) // 所有事件处理函数的this指向统一在这里修改
    this.addYear = this.addYear.bind(this)
  }
  
  heartToggle(ev) {
    //console.log(ev.nativeEvent) // ev是react提供的合成的事件对象，ev.nativeEvent是原生的事件对象
    let {isHeartOn} = this.state
    this.setState({
      isHeartOn: !isHeartOn
    })
  }

  addYear() {
    let {year} = this.state // 拿到之前的year值
    this.setState({
      year: year + 10
    })
  }

  render() {
    let { imgSrc, name, meta, desc, likeNum } = this.props

    let {txt} = this.context  // 官网警告熟悉redux才可以用

    let {isHeartOn, year} = this.state
    let isHeartClass = isHeartOn ? '' : 'empty'

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
          <span 
            className="right floated"
            onClick={this.addYear}
          >{`${txt} in ${year}`}</span>
          <span>
            <i 
              className={`${isHeartClass} heart icon`}
              onClick={this.heartToggle}
            ></i>
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