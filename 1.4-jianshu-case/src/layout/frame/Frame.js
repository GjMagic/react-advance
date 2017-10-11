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
        this.clearResInfo = this.clearResInfo.bind(this);
    }

    // 登录请求
    signInAjax(reqData) {
        /* 
            By default, axios serializes JavaScript objects to JSON. 
            To send data in the application/x-www-form-urlencoded format instead, 
            you can use one of the following options.
        */
        let qs = require('qs'); // 引入qs后，qs帮助把reqData转化为username=f&passw=f的格式
        Axios
        .post(
            `${cfg.url}/login`,
            qs.stringify(reqData) // axios默认发送json格式的数据，所以需要转换数据类型
        )
        .then(res => {
            let {code, msg} = res.data;
            console.log(res.data)
            let data = res.data;
            if(code === 0) {
                
            } else {
                this.setState({
                    signInMsg: data
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    // 清除错误提示信息
    clearResInfo() {
        this.setState({
            signInMsg: null,
            signUpMsg: null
        })
    }

    // 注册请求
    signUpAjax(reqData) {
        let qs = require('qs');
        Axios
        .post(
            `${cfg.url}/register`,
            qs.stringify(reqData) // axios默认发送json格式的数据，所以需要转换数据类型
        )
        .then(res => {
            let {code, msg} = res.data;
            let data = res.data;
            // 不管code是不是0，都要更新signUpMsg
            this.setState({
                signUpMsg: data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){

        let { signInAjax, signUpAjax, clearResInfo } = this;

        let { myInfo, signInMsg, signUpMsg } = this.state;

        return (
            <div className={S.layout}>
                <Nav/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render={
                    (props) => (
                        <SignIn {...{ 
                            signInAjax,
                            signInMsg,
                            clearResInfo 
                        }} />
                    )
                }/>
                <Route exact path="/sign_up" render={
                    (props) => (
                        <SignUp {...{
                            signUpAjax,
                            signUpMsg,
                            clearResInfo
                        }} />
                    )
                }/>
            </div>
        );
    }
}
