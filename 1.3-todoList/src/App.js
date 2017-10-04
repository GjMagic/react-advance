import React, { Component } from 'react';
import './common/style/base.css'
import './common/style/index.css'

import Header from './components/Header'
import Footer from './components/Footer'
import TodoItem from './components/TodoItem'

class App extends Component {

  render() {
    let {data} = this.props
    return (
      <section className="todoapp">
        <Header data={data} />
        <section className="main">
            <input className="toggle-all" type="checkbox" />
            <ul className="todo-list">
                {
                  data.map((item,i) => {
                    return <TodoItem {...item} key={i} />
                  })
                }
            </ul>
        </section>
        <Footer />
      </section>
    );
  }
}

export default App;
