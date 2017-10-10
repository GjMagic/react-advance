import {Route} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import SignIn from 'view/user/SignIn';
import SignUp from 'view/user/SignUp';
import S from './style.scss';
import Axios from 'axios'
import cfg from 'config/config.json'

export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            myInfo: null,
            signInMsg: null,
            signUpMsg: null
        }
        this.signInAjax = this.signInAjax.bind(this);
        this.signUpAjax = this.signUpAjax.bind(this);
    }

    // 登录请求
    signInAjax(reqData) {
        Axios
        .post(
            `${cfg.url}/login`,
            reqData
        )
        .then(res => {
            let {code, msg} = res.data;
            console.log(res)
            if(code === 0) {

            } else {
                this.setState({
                    signInMsg: res
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    // 注册请求
    signUpAjax(reqData) {
        Axios
        .post(
            `${cfg.url}/register`,
            reqData
        )
        .then(res => {
            let {code, msg} = res.data;
            
            // 不管code是不是0，都要更新signUpMsg
            this.setState({
                signUpMsg: res
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){

        let { signInAjax, signUpAjax } = this;

        let { myInfo, signInMsg, signUpMsg } = this.state;

        return (
            <div className={S.layout}>
                <Nav/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render={
                    (props) => (
                        <SignIn {...{ 
                            signInAjax,
                            signInMsg 
                        }} />
                    )
                }/>
                <Route exact path="/sign_up" render={
                    (props) => (
                        <SignUp {...{
                            signUpAjax,
                            signUpMsg
                        }} />
                    )
                }/>
            </div>
        );
    }
}
