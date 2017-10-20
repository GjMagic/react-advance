
export default class NewCltLi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cltSet: false,
            isModify: false,
            modifyCltVal: this.props.collection_name
        }
        this.tipsBlock = this.tipsBlock.bind(this);
        this.clickClt = this.clickClt.bind(this);
        this.deleteClt = this.deleteClt.bind(this);
        this.onModifyCltVal = this.onModifyCltVal.bind(this);
        this.changeCltVal = this.changeCltVal.bind(this);
        this.modifyInputBlur = this.modifyInputBlur.bind(this);
    }
    
    // 点击每个文集
    clickClt() {
        let {id, onchangeChildId} = this.props;
        onchangeChildId(id)
        this.setState({
            cltSet: false
        })
    }

    // 点击clt_setting按钮,让tips出现
    tipsBlock(ev) {
        ev.stopPropagation(); // 阻止clt_setting按钮冒泡
        let {cltSet} = this.state;
        this.setState({
            cltSet: !cltSet
        })
    }

    // 删除文集
    deleteClt() { // bug，删除的clt文集不对
        let {id, onDeleteClt} = this.props;
        onDeleteClt(id);
    }

    // 修改文集名
    onModifyCltVal() {
        this.setState({
            isModify: true
        }, () => {
            this.modifyInput.focus();
            this.modifyInput.select();
        })
    }

    // modify的input框的onChange事件
    changeCltVal(ev) {
        this.setState({
            modifyCltVal: ev.target.value
        })
    }

    // modifyInput失去焦点
    modifyInputBlur(ev) {
        if(ev.keyCode === 13) {
            console.log(this.props.collection_name) // 没有改变父级的collection_name
            this.setState({
                modifyCltVal: ev.target.value,
                isModify: false
            })
        }
    }

    render() {

        let {
            clickClt, 
            tipsBlock, 
            deleteClt, 
            onModifyCltVal, 
            changeCltVal, 
            modifyInputBlur
        } = this;

        let {cltSet, isModify, modifyCltVal} = this.state;

        let {id, childId} = this.props;

        return (
            <div>
                <input 
                    type="text"
                    value={modifyCltVal}
                    onChange={changeCltVal}
                    className={`${childId === id && isModify ? 'active' : ''} cltInput`}
                    ref={input => { this.modifyInput = input }}
                    onKeyDown={modifyInputBlur}
                />
                <li 
                    // 如果想要找到指定元素，把他的id传到函数里，然后设置状态改变id，再进行判断
                    onClick={clickClt} // 如果要往函数里传参就在bind里传
                    className={`
                        ${childId === id ? 'active' : ''}
                        ${isModify ? 'dis_appear' : ''}
                    `}
                >
                    <div className="clearfix">
                        <span
                            onMouseDown={ev => {
                                ev.preventDefault();
                            }}
                        >{modifyCltVal}</span>
                        <i 
                            className={`${childId === id ? 'active' : ''} clt_setting fr`}
                            onClick={tipsBlock}
                        ></i>
                    </div>
                    <div 
                        className={`${childId === id && cltSet ? 'active' : ''} tips`}
                        data-id={id}
                    >
                        <b className="iconfont icon-up"></b>
                        <ul className="tip_content">
                            <li
                                onClick={onModifyCltVal}
                            >
                                <i className="iconfont icon-xiugai"></i>
                                修改文集名
                            </li>
                            <li
                                onClick={deleteClt}
                            >
                                <i className="iconfont icon-shanchu"></i>
                                删除文集
                            </li>
                            <em className="tip_line"></em>
                        </ul>
                    </div>
                </li>
            </div>
        );
    }
}