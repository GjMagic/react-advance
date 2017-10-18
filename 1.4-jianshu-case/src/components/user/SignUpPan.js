import { Link } from 'react-router-dom';
import Panel from './Panel';
import S from './style.scss';
import Validation from 'util/validation.js';
import PropTypes from 'prop-types'

let propTypes = {
    signUpAjax: PropTypes.func,
    signUpMsg: PropTypes.object
}
export default class SignUpPanel extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            passw: '',
            cfPassw: '',
            nameError: '',
            passwError: '',
            cfPasswError: ''           
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

        this.changeName = this.changeName.bind(this)
        this.changePassw = this.changePassw.bind(this)
        this.changeCfPassw = this.changeCfPassw.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }

    // username的onChange
    changeName(ev) {
        let {target} = ev;

        let msg = this.validator.valiOneByValue('username', target.value);

        this.setState({
            username: target.value,
            nameError: msg
        })
    }

    // passw的onChange
    changePassw(ev) {
        let {target} = ev;

        let msg = this.validator.valiOneByValue('passw', target.value);
        let {cfPasswError} = this.state;

        this.setState({
            passw: target.value,
            passwError: msg
        })

        // 当再次验证为密码一致时，“密码不一致”提示消失
        if(cfPasswError) {
            this.changeCfPassw(ev);
        }

    }

    // cfPassw的onChange
    changeCfPassw(ev) {
        let {target} = ev;
        let cfPasswError = target.value === this.passw.value ? '' : 'Password mismatch';
        
        this.setState({
            cfPassw: target.value,
            cfPasswError
        })
    }

    // 点击注册按钮时，
    onRegister(ev) {
        ev.stopPropagation();
        ev.preventDefault(); // 不需要form帮我们提交数据，我们自己提交数据

        let {validator} = this;
        let {username, passw, cfPassw} = this.state;

        let nameError = validator.valiOneByValue('username', username);
        let passwError = validator.valiOneByValue('username', passw);
        let cfPasswError = passw === cfPassw ? '' : 'Password mismatch';

        this.setState({
            nameError,
            passwError,
            cfPasswError
        })

        let {signUpAjax} = this.props;
        if(!nameError && !passwError && !cfPasswError) {
            signUpAjax({
                username,
                passw,
                cfPassw
            })
        }
    }

    render(){

        let {changeName, changePassw, changeCfPassw, onRegister} = this;
        
        let {username, passw, cfPassw, nameError, passwError, cfPasswError} = this.state;

        let {signUpMsg} = this.props;

        let nameErrorMsg = nameError ? (<p className={S.err}>{nameError}</p>) : null;
        let passwErrorMsg = passwError ? (<p className={S.err}>{passwError}</p>) : null;
        let cfPasswErrorMsg = cfPasswError ? (<p className={S.err}>{cfPasswError}</p>) : null;

        let resInfo = null;
        
        if(signUpMsg) {
            let {code, msg} = signUpMsg;
            if(code === 0) {
                resInfo = (
                    <div className="ui positive message">
                        <ul className="list">
                            <li>Register successfully</li>
                            <li>Help you login immediately</li>
                        </ul>
                    </div>
                )
            } else {
                resInfo = (
                    <div className="ui error message">
                        <ul className="list">
                            <li>Username already exists</li>
                        </ul>
                    </div>
                )
            }
        }

        return (
            <div>
                {resInfo}
                <form 
                    className="ui large form error"
                    onSubmit={onRegister}
                >
                    <div className="ui stacked segment">
                        <div className={`field ${nameError ? 'error' : ''}`}>
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input 
                                    type="text" 
                                    name="email" 
                                    placeholder="Username"
                                    value={username}
                                    onChange={changeName}
                                />
                            </div>
                            {nameErrorMsg}
                        </div>
                        <div className={`field ${passwError ? 'error' : ''}`}>
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Password"
                                    ref={(input) => {this.passw = input}}
                                    value={passw}
                                    onChange={changePassw}
                                />
                            </div>
                            {passwErrorMsg}
                        </div>
                        <div className={`field ${cfPasswError ? 'error' : ''}`}>
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input 
                                    type="password" 
                                    name="confirm_password" 
                                    placeholder="Confirm Password"
                                    value={cfPassw}
                                    onChange={changeCfPassw}
                                />
                            </div>
                            {cfPasswErrorMsg}
                        </div>
                        <button 
                            className="ui fluid large teal submit button"
                            type="submit"
                        >Sign Up</button>
                    </div>
                </form>
                <div className="ui message">
                    After sign up，Let's <Link to="/sign_in">Sign in</Link>
                </div>
            </div>
        );
    }
}

SignUpPanel.propTypes = propTypes;