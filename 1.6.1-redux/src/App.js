import React, { Component } from 'react';

class App extends Component {
  render() {
    let { store, addGUN, removeGUN, addGUNAsync } = this.props;
    const num = store.getState();
    return (
      <div>
        <h1>现在有机枪{num}把</h1>
        <button onClick={() => { store.dispatch( addGUN() ) }}>申请武器</button>
        <button onClick={() => { store.dispatch( removeGUN() ) }}>上交武器</button>
        <button onClick={() => { store.dispatch( addGUNAsync() ) }}>异步申请武器</button>
      </div>
    );
  }
}

export default App