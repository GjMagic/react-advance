import {Route, Redirect} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import SignIn from 'view/user/SignIn';
import SignUp from 'view/user/SignUp';
import MyPage from 'view/myPage/MyPage';
import Write from 'view/write/Write';
import LoginHint from 'layout/LoginHint';

import S from './style.scss';
import Axios from 'axios';
import cfg from 'config/config.json';

export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            myInfo: null, // 控制是否变为头像
            signInMsg: null,
            signUpMsg: null,
            hasLoginReq: false,
            myPagePreview: [],
            notebooks: [],
            previewsName: '所有文章' 
        }
        this.signInAjax = this.signInAjax.bind(this);
        this.signUpAjax = this.signUpAjax.bind(this);
        this.clearResInfo = this.clearResInfo.bind(this);
        this.initMyInfo = this.initMyInfo.bind(this);
        this.logout = this.logout.bind(this);
        this.getPreview = this.getPreview.bind(this);
        this.initMyPage = this.initMyPage.bind(this);
        this.changePreviews = this.changePreviews.bind(this);
        this.updataMyIntro = this.updataMyIntro.bind(this);
    }

    // 初始化myInfo
    initMyInfo(myInfo) { // 判断了myInfo存在和不存在两种情况
        
        if(myInfo) {
            let {id, avatar, username, user_intro} = myInfo;
            avatar = cfg.url + avatar;
            myInfo = {
                user_id: id,
                user_name: username,
                avatar,
                user_intro
            }
        }

        this.setState({ myInfo })
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
                },800)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    // 注销请求
    logout() {
        Axios
        .post(`${cfg.url}/logout`)
        .then(res => {
            let resData = res.data;
            let {code} = resData;
            if(code === 0) {
                this.initMyInfo(null);
            }
        })
    }

    getPreview(data, previewsName) {
        let qs = require('qs');
        Axios
        .post(
            `${cfg.url}/getPreview`, 
            qs.stringify(data)
        )
        .then(res => {
            let resData = res.data;
            if(resData.code === 0) {
                this.setState({
                    myPagePreview: resData.data,
                    previewsName
                })
            }
        })
    }

    // 从my_page页点击文集时，改变previews和previewsName
    changePreviews(data, previewsName) {
        this.getPreview(data, previewsName);
    }

    // 初始化my_page
    initMyPage(user_id, previewsData, previewsName) {
        this.getPreview(previewsData, previewsName);

        let qs = require('qs');
        Axios
        .post(
            `${cfg.url}/getCollection`, 
            qs.stringify({user_id}) // 哪一个用户的
        )
        .then(res => {
            let resData = res.data;
            if(resData.code === 0) {
                this.setState({
                    notebooks: resData.data
                })
            }
        })
    }

    // 更新myInfo
    updataMyIntro(editValue) {
        let {myInfo} = this.state;
        // 不要过度使用结构赋值，当要改变某个对象里的key/value时，不要使用解构赋值
        myInfo.user_intro = editValue;
        this.setState({
            myInfo
        })
    }

    // 组件挂在完成之后
    componentDidMount() {
        Axios
        .post(`${cfg.url}/autologin`)
        .then(res => {
            let resData = res.data;
            if(resData.code === 0) {
                this.initMyInfo(resData.data);
            }
            this.setState({
                hasLoginReq: true
            })
        })
        .catch(err => {
            console.log(err)
        })

        /* $
        .post('https://www.easy-mock.com/mock/59b1f69ee0dc663341a1afd6/example/getUser')
        .done(res => {
            console.log(res)
        }) */

        // 刷新my_page页面时初始化my_page
        let {state, pathname} = this.props.location;
        if(state) {
            let {user_id} = state.userInfo;
            if(pathname === '/my_page') {
                this.initMyPage(user_id, {user_id}, '所有文集');
            }
        }
    }

    render(){

        let { 
            signInAjax, 
            signUpAjax, 
            clearResInfo, 
            logout, 
            initMyPage,
            changePreviews,
            updataMyIntro
        } = this;

        let { 
            myInfo, 
            signInMsg, 
            signUpMsg, 
            hasLoginReq, 
            previewsName, 
            myPagePreview, 
            notebooks 
        } = this.state;

        let {history} = this.props;

        if(!hasLoginReq) { // 自动登录请求返回数据后，设置hasLoginReq为true,渲染真正的结构
            return (<div></div>)
        }

        return (
            <div className={S.layout}> 
                <Nav {...{
                    myInfo,
                    logout,
                    initMyPage,
                    history
                }} />
                <Route exact path="/" render={
                    (props) => (
                        <Home 
                            {...{
                                initMyPage
                            }}
                            {...props} 
                        />
                    )
                } />
                <Route path="/sign_in" render={
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
                <Route path="/sign_up" render={
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
                <Route path="/my_page" render={
                    (props) => (
                        // 通过地址栏url进入my_page页时并没有state，所以重定向到首页
                        props.location.state ? ( 
                            <MyPage 
                                {...{
                                    previewsName,
                                    myPagePreview,
                                    notebooks,
                                    changePreviews,
                                    initMyPage,
                                    myInfo,
                                    updataMyIntro
                                }}
                                {...props} // props里面有match,location,history
                            />
                        ) : (
                            <Redirect to="/" />
                        )
                    )
                }/>
                <Route path='/write' render={
                    (props) => (
                        myInfo ? (
                            <Write 
                                {...{
                                    myInfo
                                }}
                            />
                        ) : (
                            <Redirect to='/login_hint' />
                        )
                    )
                } />
                <Route path='/login_hint' component={LoginHint}/>
            </div>
        );
    }
}
