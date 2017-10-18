import { Link, NavLink} from 'react-router-dom';
import S from './style.scss';
import PropTypes from 'prop-types';

let propTypes = {
    myInfo: PropTypes.object,
    logout: PropTypes.func,
    initMyPage: PropTypes.func,
    history: PropTypes.object
}

export default class Nav extends React.Component { // 无状态函数式组件的props直接传进来即可

    constructor(props) {
        super(props)
        this.serching = this.serching.bind(this);
    }

    serching() {
        $('.ui.search')
        .search({
            source: contents
        });
    }

    render() {

        let {myInfo, logout, history, initMyPage} = this.props;
        let userLink = null;
        let homeLink = null;

        if(myInfo){
    
            let {user_id} = myInfo;
    
            userLink = (
                <NavLink 
                    to="/my_page"
                    className={`${S.avatar} ui dropdown item`}
                    activeClassName="active"
                    onClick={ev => {
                        ev.stopPropagation();
                        ev.preventDefault();
                        history.push('/my_page', {userInfo: myInfo});
                        initMyPage(user_id, {user_id}, '所有文章');
                    }}
                >
                    <img
                        src={myInfo.avatar}
                        className="ui image avatar"
                        alt=""
                    />
                    <i className="caret down icon"></i>
                    <div className={`${S.dropDown} menu`}>
                        <p
                            onClick={(ev) => {
                                ev.stopPropagation();
                                ev.preventDefault();
                                logout();
                            }}
                            className="item"
                        ><i className="teal sign out icon"></i>注销</p>
                        <p className="item"><i className="teal user icon"></i>我的主页</p>
                        <p className="item"><i className="teal bookmark icon"></i>收藏的文章</p>
                        <p className="item"><i className="teal heart icon"></i>喜欢的文章</p>
                        <p className="item"><i className="teal money icon"></i>我的钱包</p>
                        <p className="item"><i className="teal help icon"></i>帮助与反馈</p>
                        <p className="item"><i className="teal setting icon"></i>设置</p>
                    </div>
                </NavLink>
            );
    
            homeLink = [
                (
                    <NavLink 
                        exact 
                        to="/"
                        className={`item`}
                        activeClassName="active"
                        key={0}
                    ><i className="tripadvisor icon"></i>发现</NavLink>
                ),
                (
                    <NavLink 
                        exact 
                        to="/attention"
                        className={`item`}
                        activeClassName="active"
                        key={1}
                    ><i className="thumbs outline up icon"></i>关注</NavLink>
                ),
                (
                    <NavLink 
                        exact 
                        to="/message"
                        className={`${S.message} ui dropdown item`}
                        activeClassName="active"
                        key={2}
                    >
                        <i className="alarm outline icon"></i>消息
                        <div className={`${S.dropDown} menu`}>
                            <p className="item"><i className="teal comments outline icon"></i>评论</p>
                            <p className="item"><i className="teal mail outline icon"></i>简信</p>
                            <p className="item"><i className="teal external share icon"></i>投稿请求</p>
                            <p className="item"><i className="teal empty heart icon"></i>喜欢和赞</p>
                            <p className="item"><i className="teal unhide icon"></i>关注</p>
                            <p className="item"><i className="teal diamond icon"></i>赞赏</p>
                            <p className="item"><i className="teal talk outline icon"></i>其他消息</p>
                        </div>
                    </NavLink>
                )
            ]
    
        } else {
            userLink = [
                (<NavLink 
                    to="/sign_in"
                    className={`${S.login} item`}
                    activeClassName="active"
                    key={0}
                ><i className="sign in icon"></i>登录</NavLink>),
                (<NavLink 
                    to="/sign_up"
                    className={`item`}
                    activeClassName="active"
                    key={1}
                ><i className="sign out icon"></i>注册</NavLink>)
            ]
    
            homeLink = (
                <NavLink 
                    exact 
                    to="/"
                    className={`item`}
                    activeClassName="active"
                ><i className="home icon"></i>首页</NavLink>
            )
        }

        let { serching } = this;

        return (
            <div className={`ui fixed huge borderless menu teal pointing ${S.nav}`}>
                <div className="ui container">
                    <div 
                        to="/"
                        className={`item`}
                    >
                        <img src="//cdn2.jianshu.io/assets/web/logo-58fd04f6f0de908401aa561cda6a0688.png" />
                    </div>
                    {homeLink}
                    <div className="ui search item">
                        <div className="ui icon input">
                            <input 
                                className="prompt" 
                                type="text" 
                                placeholder="搜索文集、作者..." 
                                onClick={serching}
                            />
                            <i className="search icon"></i>
                        </div>
                        <div className="results"></div>
                    </div>
                    <div className="menu right">
                        {userLink}
                        <NavLink 
                            to="/write"
                            className={`item`}
                            activeClassName="active"
                        ><i className="edit icon"></i>写文章</NavLink>
                    </div>
                </div>
            </div>
        );    
    }
    
}
Nav.propTypes = propTypes;











































































let contents = [
    { title: 'Andorra' },
    { title: 'United Arab Emirates' },
    { title: 'Afghanistan' },
    { title: 'Antigua' },
    { title: 'Anguilla' },
    { title: 'Albania' },
    { title: 'Armenia' },
    { title: 'Netherlands Antilles' },
    { title: 'Angola' },
    { title: 'Argentina' },
    { title: 'American Samoa' },
    { title: 'Austria' },
    { title: 'Australia' },
    { title: 'Aruba' },
    { title: 'Aland Islands' },
    { title: 'Azerbaijan' },
    { title: 'Bosnia' },
    { title: 'Barbados' },
    { title: 'Bangladesh' },
    { title: 'Belgium' },
    { title: 'Burkina Faso' },
    { title: 'Bulgaria' },
    { title: 'Bahrain' },
    { title: 'Burundi' },
    { title: '刘淼' },
    { title: '简述大学堂' },
    { title: '念远怀仁' },
    { title: '穿着prada挤地铁' },
    { title: '白发老蘭' }
  ];