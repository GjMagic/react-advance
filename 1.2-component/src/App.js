import React, { Component } from 'react'

import Nav from './components/nav/Nav'
import CardWrap from './components/cardWrap/CardWrap'

class App extends Component {
  
  render() {
    return (
      <div>
        <div className="ui container">
          <div className="ui dividing">
            <Nav />
            <CardWrap />
          </div>
        </div>
      </div>
    );
  }
}
export default App