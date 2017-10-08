import Panel from './Panel';
import S from './style.scss';
import Validation from 'util/validation.js'

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

    render(){

        let { changeName, changePassW } = this;

        let { username, passW, nameErr, passwErr } = this.state;

        let nameErrMsg = nameErr ? (<p className={S.err}>{nameErr}</p>) : null;
        let passwErrMsg = passwErr ? (<p className={S.err}>{passwErr}</p>) : null;

        return (
            <div className={S.sign_panel}>
                <form
                    className="ui form"
                >
                    <div className={`field ${nameErr ? 'error' : ''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            ref="nameDom"
                            value={username}
                            onChange={changeName}
                        />
                        {nameErrMsg}
                    </div>

                    <div className={`field ${passwErr ? 'error' : ''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            ref="passwDom"
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
