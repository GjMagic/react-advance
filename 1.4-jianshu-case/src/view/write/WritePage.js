
import { Component } from 'react';
import Axios from 'axios';
import cfg from 'config/config.json';

import './css/reset_pc.css';
import S from './css/style.css';

let propTypes = {
    myInfo: PT.object
}

export default class WritePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            collections: [],
            titleVal: '',
            cltVal: '',
            contentVal: ''
        }
    }

    render(){

        return(
            <div className="container">
                <div className="left_side">
                    <a href="/" className="back_home">回首页</a>
                    <h3 className="clearfix">
                        <i className="add_icon fl"></i> 
                        新建文集
                    </h3>
                    <div className="new_collect clearfix">
                        <input type="text" placeholder="请输入文集名..." />
                        <a href="javascript:;" className="ensure fl">提交</a>
                        <a href="javascript:;" className="cancel fl">取消</a>
                    </div>
                </div>
            </div>
        )
    }
}

WritePage.propTypes = propTypes;
