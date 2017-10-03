import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Nav from './components/nav/Nav'
import CardWrap from './components/cardWrap/CardWrap'

class App extends Component {

  getChildContext() { // getChildContext与childContextTypes对应
    return {
      txt: 'died'
    }
  }

  render() {
    
    let {data} = this.props

    return (
      <div>
        <div className="ui container">
          <div className="ui dividing">
            <Nav />
            <CardWrap data={data} />
          </div>
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  txt: PropTypes.string
}
export default App