import Panel from './Panel';
import S from './style.scss';
import Validation from 'util/validation.js'
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
            {strategy: 'isEmpty', errorMsg: '用户名不能为空'},
            {strategy: 'hasSpace', errorMsg: '用户名不能有空格'},
            {strategy: 'maxLength:6', errorMsg: '最长为6'}            
        ])

        // passw的验证规则
        this.validator.addByValue('passw',[
            {strategy: 'isEmpty', errorMsg: '密码不能为空'},
            {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
            {strategy: 'maxLength:6', errorMsg: '最长为6'}            
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
        let cfPasswError = target.value === this.passw.value ? '' : '密码不一致';
        
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
        let cfPasswError = passw === cfPassw ? '' : '密码不一致';

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
                    <div className="ui message positive">
                        <p>{msg}</p>
                        <p>马上帮你登录</p>
                    </div>
                )
            } else {
                resInfo = (
                    <div className="ui message error">
                        <p>{msg}</p>
                    </div>
                )
            }
        }

        return (
            <div className={S.sign_panel}>
                {resInfo}
                <form
                    className="ui form"
                    onSubmit={onRegister}
                >
                    <div className={`field ${nameError ? 'error' : ''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            ref="nameDom"
                            value={username}
                            onChange={changeName}
                        />
                        {nameErrorMsg}
                    </div>
                    <div className={`field ${passwError ? 'error' : ''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            ref={(input) => {this.passw = input}}
                            value={passw}
                            onChange={changePassw}
                        />
                        {passwErrorMsg}
                    </div>
                    <div className={`field ${cfPasswError ? 'error' : ''}`}>
                        <input
                            type="text"
                            placeholder="确认密码"
                            value={cfPassw}
                            onChange={changeCfPassw}
                        />
                        {cfPasswErrorMsg}
                    </div>
                    <div className="field">
                        <button 
                            type="submit"
                            className="ui button fluid primary"
                        >注册</button>
                    </div>
                </form>
            </div>
        );
    }
}

SignUpPanel.propTypes = propTypes;