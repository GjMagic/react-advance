import React, { Component } from 'react'
import Card from '../card/Card'

export default class CardWrap extends Component {
  
  render() {
    let {data} = this.props

    let cards = data.map((item,i) => {
      return <Card {...item} key={i} /> // {...item}结构赋值，把item里的每一项放在this.props身上
    })

    return (
      <div className="ui cards">
        {cards}
      </div>
    )
  }
}