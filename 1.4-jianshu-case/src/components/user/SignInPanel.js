import Panel from './Panel';
import S from './style.scss';
import Validation from 'util/validation.js'
import PropTypes from 'prop-types'

let propTypes = {
    signInAjax: PropTypes.func,
    signInMsg: PropTypes.object
}

export default class SignInPanel extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            passW: '',
            nameErr: '',
            passwErr: ''
        }

        this.validator = new Validation();

        // username的验证规则
        this.validator.addByValue('username',[
            {strategy: 'isEmpty', errorMsg: '用户名不能为空'},
            {strategy: 'hasSpace', errorMsg: '用户名不能有空格'},
            {strategy: 'maxLength:6', errorMsg: '最长为6'}
        ])

        // passW的验证规则
        this.validator.addByValue('passW',[
            {strategy: 'isEmpty', errorMsg: '密码不能为空'},
            {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
            {strategy: 'maxLength:6', errorMsg: '最长为6'}
        ])

        this.changeName = this.changeName.bind(this);
        this.changePassW = this.changePassW.bind(this);
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
    changePassW(ev) {
        let {target} = ev

        let msg = this.validator.valiOneByValue('passW',target.value)

        this.setState({
            passW: target.value,
            passwErr: msg
        })
    }

    // 提交登录时
    onSubmit(ev) {
        ev.stopPropagation(); // 阻止冒泡
        ev.preventDefault(); // 取消默认行为
        // 提交登录前也要先验证数据
        let {validator} = this;
        let {username, passW} = this.state;

        let nameErr = validator.valiOneByValue('username',username);
        let passwErr = validator.valiOneByValue('passW',passW);

        this.setState({
            nameErr,
            passwErr
        })

        let {signInAjax} = this.props;

        // 如果前端验证错误直接截断请求
        if(!nameErr && !passwErr) { // 两个都正确才能通过
            signInAjax({
                username,
                passW
            });
        }   

    }

    render(){

        let { changeName, changePassW, onSubmit } = this;

        let { username, passW, nameErr, passwErr } = this.state;

        let { signInMsg } = this.props;

        let nameErrMsg = nameErr ? (<p className={S.err}>{nameErr}</p>) : null;
        let passwErrMsg = passwErr ? (<p className={S.err}>{passwErr}</p>) : null;

        let resInfo = null;

        if(signInMsg && signInMsg.data.code !==0) {
            resInfo = (
                <div className="ui message error">
                    <p>{signInMsg.data.msg}</p>
                </div>
            )
        }

        return (
            <div className={S.sign_panel}>
                {resInfo}
                <form
                    className="ui form"
                    onSubmit={onSubmit} // 当点击登录按钮时，会触发form表单的onsubmit事件
                >
                    <div className={`field ${nameErr ? 'error' : ''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            ref={input => {this.nameDom = input}}
                            value={username}
                            onChange={changeName}
                        />
                        {nameErrMsg}
                    </div>

                    <div className={`field ${passwErr ? 'error' : ''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            ref={input => {this.passwDom = input}}
                            value={passW}
                            onChange={changePassW}
                        />
                        {passwErrMsg}
                    </div>

                    <div className="field">
                        <button 
                            type="submit"
                            className="ui button fluid primary"
                        >登录</button>
                    </div>
                </form>
            </div>
        );
    }
}

SignInPanel.propTypes = propTypes;
