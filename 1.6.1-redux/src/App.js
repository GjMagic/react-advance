import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGUN, removeGUN, addGUNAsync } from './reducer';
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

const mapStateToProps = (state) => {
  console.log(state)
  return { num: state }
}
const mapDispatchToProps = { addGUN, removeGUN, addGUNAsync };
export default connect(mapStateToProps, mapDispatchToProps)(App)