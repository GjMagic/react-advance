
import {Component} from 'react';
import Axios from 'axios';
import cfg from 'config/config.json';
import S from './style.scss';

let propTypes = {
    myInfo: PT.object
}

export default class Write extends Component{

    constructor(props){
        super(props);
        this.state = {
            collections: [],
            titleVal: '',
            cltVal: '',
            contentVal: ''
        }
        this.changeTitle = this.changeTitle.bind(this);
        this.changeClt = this.changeClt.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addCollection = this.addCollection.bind(this);
        this.collectionName = {};
    }

    changeTitle(ev) {
        this.setState({
            titleVal: ev.target.value
        })
    }

    changeClt(ev) {
        this.setState({
            cltVal: ev.target.value
        })
    }

    changeContent(ev) {
        this.setState({
            contentVal: ev.target.value
        })
    }

    // 提交时
    onSubmit(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        let cltId = this.cltIdInput.value;

        if(!cltId) return;

        let {
            titleVal: article_title,
            contentVal: article_content
        } = this.state;

        let {user_id} = this.props.myInfo;
        let collection_name = this.collectionName[cltId];

        let qs = require('qs');
        Axios
        .post(
            `${cfg.url}/addArticle`,
            qs.stringify(
                {
                    article_title,
                    article_content,
                    user_id,
                    collection_name,
                    collection_id: cltId
                }
            )
        )
        .then(res => {
            if(res.data.code === 0) {
                this.setState({
                    titleVal: '',
                    contentVal: ''
                })
            }
        })
    }

    // 添加文集
    addCollection(ev) {
        if(ev.keyCode === 13) {

            let name = this.state.cltVal;
            let {user_id} = this.props.myInfo;

            let qs = require('qs');
            Axios
            .post(
                `${cfg.url}/addCollection`,
                qs.stringify(
                    {
                        name,
                        user_id
                    }
                )
            )
            .then(res => {
                if(res.data.code === 0) {
                    this.setState({
                        cltVal: '',
                        collections: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    componentDidMount() {

        let {user_id} = this.props.myInfo;

        let qs = require('qs');
        Axios
        .post(
            `${cfg.url}/getCollection`,
            qs.stringify({user_id})
        )
        .then(res => {
            if(res.data.code === 0) {
                this.setState({
                    collections: res.data.data
                })
            }
        })

        $(this.dropDown).dropdown();
    }
      
    componentWillUnmount() {
        $(this.dropDown).off();
    }
    
    render(){

        let {changeTitle, changeClt, changeContent, onSubmit, addCollection} = this;

        let {collections, titleVal, cltVal, contentVal} = this.state;

        collections = collections.map((item, i) => {
            let {id, collection_name} = item;
            this.collectionName[id] = collection_name;
            return (
                <div 
                    className="item" 
                    key={i}
                    data-value={id}
                >
                    {collection_name}
                </div>
            )
        })

        return(
            <div className="ui container">
                <header className="ui header dividing">
                    <h1>写文章</h1>
                </header>
                <form
                    className="ui form"
                    onSubmit={onSubmit}
                >
                    <div className="field">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="标题"
                            value={titleVal}
                            onChange={changeTitle}
                        />
                    </div>
                    <div className="fields">
                        <div className="field five wide column required">
                            <div 
                                className="ui selection dropdown" 
                                id="writeArtical"
                                ref={div => {this.dropDown = div}}
                            >
                                <input
                                    type="hidden"
                                    name="album"
                                    ref={input => {this.cltIdInput = input}}
                                />
                                <div className="default text">选择一个文集</div>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                    {collections}
                                </div>
                            </div>
                        </div>
                        <div className="field eleven wide column">
                            <input
                                type="text"
                                className=""
                                placeholder="回车, 添加文集"
                                value={cltVal}
                                onChange={changeClt}
                                onKeyDown={addCollection}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <textarea
                            rows="16"
                            className=""
                            placeholder="随便写点文字. . ."
                            value={contentVal}
                            onChange={changeContent}
                        >
                        </textarea>
                    </div>
                    <div className="field">
                        <button type="submit"
                            className="ui button primary"
                        >保存</button>
                    </div>
                </form>
            </div>
        )
    }
}

Write.propTypes = propTypes;
