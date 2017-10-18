import { Link } from 'react-router-dom';
import Panel from './Panel';
import S from './style.scss';
import Validation from 'util/validation.js';
import PropTypes from 'prop-types';

let propTypes = {
    signInAjax: PropTypes.func,
    signInMsg: PropTypes.object
}

export default class SignInPan extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            passw: '',
            nameErr: '',
            passwErr: ''
        }
        this.validator = new Validation();
        
        // username的验证规则
        this.validator.addByValue('username',[
            {strategy: 'isEmpty', errorMsg: 'The username cannot be empty'},
            {strategy: 'hasSpace', errorMsg: 'Usernames cannot have spaces'},
            {strategy: 'maxLength:6', errorMsg: 'Your password must be no more than 6 characters'}
        ])

        // passw的验证规则
        this.validator.addByValue('passw',[
            {strategy: 'isEmpty', errorMsg: 'Password cannot be empty'},
            {strategy: 'hasSpace', errorMsg: 'Password cannot have spaces'},
            {strategy: 'maxLength:6', errorMsg: 'Your password must be no more than 6 characters'}
        ])

        this.changeName = this.changeName.bind(this);
        this.changePassw = this.changePassw.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

     // username的onChange
     changeName(ev) {
        let {target} = ev

        let msg = this.validator.valiOneByValue('username',target.value) // 如果验证成功则返回undifine，否则返回错误信息

        this.setState({
            username: target.value,
            nameErr: msg
        })
    }

    // passW的onChange
    changePassw(ev) {
        let {target} = ev

        let msg = this.validator.valiOneByValue('passw',target.value)

        this.setState({
            passw: target.value,
            passwErr: msg
        })
    }

    // 提交登录时
    onSubmit(ev) {
        ev.stopPropagation(); // 阻止冒泡
        ev.preventDefault(); // 取消默认行为
        // 提交登录前也要先验证数据
        let {validator} = this;
        let {username, passw} = this.state;

        let nameErr = validator.valiOneByValue('username',username);
        let passwErr = validator.valiOneByValue('passw',passw);

        this.setState({
            nameErr,
            passwErr
        })

        let {signInAjax} = this.props;

        // 如果前端验证错误直接截断请求
        if(!nameErr && !passwErr) { // 两个都正确才能通过
            signInAjax({
                username,
                passw
            });
        }   
    }   

    render(){
        let { changeName, changePassw, onSubmit } = this;
        
        let { username, passw, nameErr, passwErr } = this.state;

        let { signInMsg } = this.props;
        
        let nameErrMsg = nameErr ? (<p className={S.err}>{nameErr}</p>) : null;
        let passwErrMsg = passwErr ? (<p className={S.err}>{passwErr}</p>) : null;

        let resInfo = null;
        if(signInMsg && signInMsg.code !== 0) {
            resInfo = (
                <div className="ui error message">
                    <ul className="list">
                        <li>Incorrect password! Please try again</li>
                    </ul>
                </div>
            )
        }
        
        return (
            <div>
                <form 
                    className="ui large form error"
                    onSubmit={onSubmit} // 当点击登录按钮时，会触发form表单的onsubmit事件
                >
                    <div className="ui stacked segment">
                        <div className={`field ${nameErr ? 'error' : ''}`}>
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input 
                                    type="text" 
                                    name="email" 
                                    placeholder="Username" 
                                    ref={input => {this.nameDom = input}}
                                    value={username}
                                    onChange={changeName}
                                />
                            </div>
                            {nameErrMsg}
                        </div>
                        <div className={`field ${passwErr ? 'error' : ''}`}>
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Password" 
                                    ref={input => {this.passwDom = input}}
                                    value={passw}
                                    onChange={changePassw}
                                />
                            </div>
                            {passwErrMsg}
                        </div>
                        <button 
                            className="ui fluid large teal submit button"
                            type="submit"    
                        >Login</button>
                    </div>
                    {resInfo}
                </form>
                <div className="ui message">
                    New to us? <Link to="/sign_up">Sign up</Link>
                </div>
            </div>
        );
    }
}

SignInPan.propTypes = propTypes;
