import { 
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Frame from 'frame/Frame'

require('semantic/dist/semantic.min.css')
require('semantic/dist/semantic.min.js')

ReactDOM.render(
    <Router>
        <Route path='/' component={ Frame }/>
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
