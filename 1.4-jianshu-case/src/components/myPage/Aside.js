
import Axios from 'axios';
import cfg from 'config/config.json';
import S from './style.scss';
let propTypes = {
    notebooks: PT.array,
    userInfo: PT.object,
    changePreviews: PT.func,
    myInfo: PT.object,
    updataMyIntro: PT.func,
    isMe: PT.bool
}

export default class Aside extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            editValue: ''
        }
        this.editMe = this.editMe.bind(this);
        this.changeEditValue = this.changeEditValue.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.editDone = this.editDone.bind(this);
    }
    
    // 点击编辑按钮
    editMe() {
        let {user_intro} = this.props.userInfo;
        this.setState({
            isEdit: true,
            editValue: user_intro
        })
    }

    // 改变编辑的文字
    changeEditValue(ev) {
        this.setState({
            editValue: ev.target.value
        })
    }

    // 点击取消按钮
    cancelEdit() {
        this.setState({
            isEdit: false
        })
    }

    // 点击确定按钮完成编辑
    editDone(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        let {editValue} = this.state;
        let {user_intro, user_id} = this.props.userInfo;

        let qs = require('qs');
        Axios
        .post(
            `${cfg.url}/editIntro`,
            qs.stringify(
                {
                    user_intro: editValue,
                    user_id
                }
            )
        )
        .then(res => {
            if(res.data.code === 0) {
                this.setState({
                    isEdit: false
                })
                this.props.updataMyIntro(editValue);
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        let {editMe, changeEditValue, cancelEdit, editDone} = this;
        let {isEdit, editValue} = this.state;
        let {notebooks, changePreviews, userInfo, myInfo, isMe} = this.props;
        let {user_intro} = userInfo;

        notebooks = notebooks.map((item, i) => {
            let {id: collection_id, collection_name} = item;
            return (
                <div 
                    className="item" 
                    key={i}
                    onClick={ev => {
                        changePreviews({collection_id}, collection_name);
                    }}
                >
                    <i className="book icon"></i>
                    <div className="content">
                        {collection_name}
                    </div>
                </div>
            )   
        })

        return (
            <div className={S.aside}>
                <div className="introduce">
                    <div className="title">
                        个人介绍
                        {
                            isMe ? (
                                <div 
                                    className="ui button tiny basic right floated"
                                    onClick={editMe}
                                >
                                    <i className="icon write"></i>
                                    编辑
                                </div>
                            ) : null
                        }
                        <div className="ui divider hidden"></div>

                        {
                            isEdit ? (
                                <form 
                                    action="" 
                                    className="ui form"
                                    onSubmit={editDone}
                                >
                                    <div className="field">
                                        <textarea
                                            value={editValue}
                                            onChange={changeEditValue}
                                        ></textarea>    
                                    </div>
                                    <button className="ui positive button" type="submit">
                                        提交
                                    </button>
                                    <button 
                                        className="ui negative button" 
                                        type="submit"
                                        onClick={cancelEdit}
                                    >
                                        取消
                                    </button>
                                </form>
                            ) : (
                                <p>{user_intro}</p>
                            )
                        }
                    </div>
                </div>
                <div className="ui divider hidden"></div>
                <div className={S.volume}>
                    <div className={S.title}>
                        我的文集
                    </div>
                    <div className="ui list">
                        {notebooks}
                    </div>
                </div>
            </div>
        );
    }
}

Aside.propTypes = propTypes;