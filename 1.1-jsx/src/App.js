import React from 'react';

class App extends React.Component {
  render() {
    return (
      /* 
        1.第一个大括号是jsx的‘模板’，模板里的css样式写在对象中,
        并且以key/value形式存在，写多个时以逗号隔开
      */
      <div style={ {color: 'red'} }>hello</div>
    );
  }
}

export default App;
