import {Route} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import S from './style.scss';

export default class Layout extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={S.layout}>
                <Nav/>
                <Route exact path="/" component={Home}/>
            </div>
        );
    }
}
