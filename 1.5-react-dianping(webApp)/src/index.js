import React from 'react'
import ReactDOM from 'react-dom'

import './static/css/common.less'

class Hello extends React.Component {
    render() {
        return (
            <p>hello world123</p>
        )
    }
}

ReactDOM.render(
    <Hello/>,
    document.getElementById('root')
)
