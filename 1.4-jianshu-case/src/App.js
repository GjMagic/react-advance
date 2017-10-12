import { 
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Axios from 'axios'

import Frame from 'frame/Frame'

require('semantic/dist/semantic.min.css')
require('semantic/dist/semantic.min.js')

/* $.ajaxSetup({ // jquery在请求头设置cookie的方式
    xhrFields: { withCredentials: true }
}) */
Axios.defaults.withCredentials = true; // axios在请求头设置cookie的方式

ReactDOM.render(
    <Router>
        <Route path='/' component={ Frame }/>
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
