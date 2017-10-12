import {Route, Redirect} from 'react-router-dom';
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
            myInfo: null, // 控制是否变为头像
            signInMsg: null,
            signUpMsg: null,
            hasLoginReq: false 
        }
        this.signInAjax = this.signInAjax.bind(this);
        this.signUpAjax = this.signUpAjax.bind(this);
        this.clearResInfo = this.clearResInfo.bind(this);
        this.initMyInfo = this.initMyInfo.bind(this);
    }

    initMyInfo(myInfo) {
        myInfo.avatar = cfg.url + myInfo.avatar;
        this.setState({
            myInfo
        })
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
            let resData = res.data;

            if(code === 0) {
                this.initMyInfo(resData.data);
            } else {
                this.setState({
                    signInMsg: resData
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
            let resData = res.data;
            // 不管code是不是0，都要更新signUpMsg
            this.setState({
                signUpMsg: resData
            })

            if(code === 0) {
                setTimeout(() => {
                    this.initMyInfo(resData.data);
                },600)
            }

        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        Axios
        .post(`${cfg.url}/autologin`)
        .then(res => {
            let resData = res.data;
            if(resData.code === 0) {
                this.initMyInfo(resData.data);
            }
            console.log(resData)
            this.setState({
                hasLoginReq: true
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){

        let { signInAjax, signUpAjax, clearResInfo } = this;

        let { myInfo, signInMsg, signUpMsg, hasLoginReq } = this.state;

        if(!hasLoginReq) { // 自动登录请求返回数据后，设置hasLoginReq为true,渲染真正的结构
            return (<div></div>)
        }

        return (
            <div className={S.layout}>
                <Nav {...{
                    myInfo
                }} />
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render={
                    (props) => (
                        myInfo ? (
                            <Redirect to="/" />
                        ) : (
                            <SignIn {...{ 
                                signInAjax,
                                signInMsg,
                                clearResInfo 
                            }} />
                        )
                    )
                }/>
                <Route exact path="/sign_up" render={
                    (props) => (
                        myInfo ? (
                            <Redirect to="/" />
                        ) : (
                            <SignUp {...{
                                signUpAjax,
                                signUpMsg,
                                clearResInfo
                            }} />
                        )
                    )
                }/>
            </div>
        );
    }
}
