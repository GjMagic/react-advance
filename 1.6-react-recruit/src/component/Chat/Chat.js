import React, { Component } from 'react'
import io from 'socket.io-client';

class Chat extends Component {

  componentDidMount() {
    const socket = io('ws://localhost:9093');
  }
  
  render() {
    // this.props.match(命中).params(参数).user(参数名)
    return (
      <div>
        <h2>Chat with user:{this.props.match.params.user}</h2>
      </div>
    );
  }
}

export default Chat;