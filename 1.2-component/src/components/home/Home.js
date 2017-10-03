import React, { Component } from 'react'

export default class Home extends Component {
  
  render() {
    return (
      <div>
        <img 
          src={ require('../../common/images/128H.jpg') } 
          alt='' 
          style={ {width: '400px',height: '400px'} }
        />
      </div>
    )
  }
}