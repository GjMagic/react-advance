
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import cfg from 'config/config.json';

import NewCltLi from './NewCltLi';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import S from './css/style.css';

let propTypes = {
    myInfo: PT.object
}

let collections = [
    {
        id: 1,
        collection_name: '日记本'
    },
    {
        id: 2,
        collection_name: '随笔'
    }
]

export default class WritePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            collections,
            titleVal: '',
            cltVal: '',
            contentVal: '',
            editorState: '', // 富文本编辑器状态
            isAppear: false, //点击添加文集后，是否出现input框
            childId: 1
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.inputAppear = this.inputAppear.bind(this);
        this.changeClt = this.changeClt.bind(this);
        this.cancelAddClt = this.cancelAddClt.bind(this);
        this.addCollection = this.addCollection.bind(this);
        this.onchangeChildId = this.onchangeChildId.bind(this);
        this.onDeleteClt = this.onDeleteClt.bind(this);
        
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState
        })
    }

    // 点击添加文集后，出现input框
    inputAppear() {
        let {isAppear} = this.state;
        
        this.setState({
            isAppear: !isAppear
        }, () => { // setState是异步的,等页面重新渲染完成后再获取焦点
            this.cltInput.focus();
        })
    }

    changeClt(ev) {
        this.setState({
            cltVal: ev.target.value
        })
    }

    cancelAddClt() {
        let {isAppear} = this.state;
        this.setState({
            isAppear: false
        })
    }

    // 添加文集
    addCollection() {
        let {cltVal} = this.state;
        let t = Date.now();
        if(!cltVal) {
            alert('请添加文集名!'); 
            return
        };
        let newCollection = {
            id: t,
            collection_name: cltVal
        }
        collections.push(newCollection);
        this.setState({
            cltVal: '',
            collections,
            isAppear: false,
            childId: t
        })
    }

    // 改变子li的id的回调函数
    onchangeChildId(id) {
        this.setState({
            childId: id
        })
    }

    // 删除文集的回调函数
    onDeleteClt(id) {
        collections = collections.filter(item => {
            return item.id !== id
        })
        this.setState({
            collections
        })
    }

    render(){
        let {
            onEditorStateChange, 
            inputAppear, 
            changeClt,
            cancelAddClt,
            addCollection,
            onchangeChildId,
            onDeleteClt
        } = this;
        let {
            editorState, 
            isAppear, 
            cltVal, 
            collections,
            childId
        } = this.state;

        collections = collections.map((item, i) => {
            let {id, collection_name} = item;
            return (
                <NewCltLi
                    key={i}
                    {...{
                        id, 
                        collection_name,
                        childId,
                        onchangeChildId,
                        onDeleteClt
                    }}
                />   
            )
        })

        return(
            <div className="containers clearfix">
                <div className="left_side fl">
                    <Link to="/" className="back_home">回首页</Link>
                    <h3 
                        className="clearfix"
                        onClick={inputAppear}
                    >
                        <i className="add_icon fl"></i> 
                        <span
                            onMouseDown={ev => { // 鼠标按下是最先触发的事件，取消它的默认即可 
                                ev.preventDefault();
                            }}
                        >新建文集</span>
                    </h3>
                    <div className={`new_collect ${isAppear ? 'active' : ''} clearfix`}>
                        <input 
                            type="text" 
                            placeholder="请输入文集名..."
                            className={`${isAppear ? 'active' : ''} cltInput`}
                            ref={input => { this.cltInput = input }} 
                            value={cltVal}
                            onChange={changeClt}
                        />
                        <a 
                            href="javascript:;" 
                            className="ensure fl"
                            onClick={addCollection}
                        >提交</a>
                        <a 
                            href="javascript:;" 
                            className="cancel fl"
                            onClick={cancelAddClt}
                        >取消</a>
                    </div>
                    <ul className="collections">
                        {collections}
                    </ul>
                    <h2 className="clearfix">
                        <i className="recycle_icon fl"></i>
                        回收站
                    </h2>
                </div>
                <div className="mid_new fl">
                    <h2 className="clearfix">
                        <i className="add_article fl"></i>
                        新建文章
                    </h2>
                    <ul className="articles">
                        <li className="active clearfix"> 
                            <i className="o_article fl"></i>
                            <span>无标题文章</span>
                        </li>
                        <li className="clearfix">
                            <i className="o_article fl"></i>
                            <span>无标题文章</span>
                        </li>
                    </ul>
                    <h4 className="clearfix">
                        <i className="add_down_arti fl"></i>
                        在下方新建文章
                    </h4>
                </div>
                <div className="right_side fr">
                    <input placeholder="无标题文章" className="editor_title" />
                    <Editor
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                    />
                </div>
            </div>
        )
    }
}

WritePage.propTypes = propTypes;
