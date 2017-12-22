import React, { Component } from 'react'

export default function HocForm(Comp) {
  return class WrapperComp extends Component {
    constructor(props) {
      super(props);
      this.state = {}
      this.handleChange = this.handleChange.bind(this);
    }

    // 表单的onChange事件
    handleChange(type, val) {
      this.setState({
        [type]: val
      })
    }

    render() {

      const { state, handleChange, props } = this;

      return (
        <Comp {...{ state, handleChange }} {...props} />
      )
    }
  }
}

