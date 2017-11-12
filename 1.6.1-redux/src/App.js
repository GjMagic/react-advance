import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGUN, removeGUN, addGUNAsync } from './reducer';

/* const mapStateToProps = (state) => {
  return { num: state }
}
const mapDispatchToProps = { addGUN, removeGUN, addGUNAsync };
App = connect(mapStateToProps, mapDispatchToProps)(App) */

@connect(
  // 要什么state放在props里
  state => ({ num: state }), // mapStateToProps
  // 要什么方法放在props里，并自动dispatch
  { addGUN, removeGUN, addGUNAsync } // mapDispatchToProps
)

class App extends Component {
  render() {
    let { num, addGUN, removeGUN, addGUNAsync } = this.props;
    return (
      <div>
        <h1>现在有机枪{num}把</h1>
        <button onClick={addGUN}>申请武器</button>
        <button onClick={removeGUN}>上交武器</button>
        <button onClick={addGUNAsync}>异步申请武器</button>
      </div>
    );
  }
}

export default App