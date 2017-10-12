import { Link, NavLink} from 'react-router-dom';
import S from './style.scss';
import PropTypes from 'prop-types';

let propTypes = {
    myInfo: PropTypes.object,
    logout: PropTypes.func
}
export default function Nav(props){ // 无状态函数式组件的props直接传进来即可

    let {myInfo, logout} = props;
    let userLink = null;
    if(myInfo){
        userLink = (
            <NavLink 
                to="/my_page"
                className={`${S.avatar} item`}
                activeClassName="active"
            >
                <img
                    src={myInfo.avatar}
                    className="ui image avatar"
                    alt=""
                />
                <div className={S.dropDown}>
                    <p
                        onClick={(ev) => {
                            ev.stopPropagation();
                            ev.preventDefault();
                            logout();
                        }}
                    >注销</p>
                </div>
            </NavLink>
        )
    } else {
        userLink = [
            (<NavLink to="/sign_in"
                className={`item`}
                activeClassName="active"
                key={0}
            >登录</NavLink>),
            (<NavLink to="/sign_up"
                className={`item`}
                activeClassName="active"
                key={1}
            >注册</NavLink>)
        ]
    }

    return (
        <div className={`ui fixed secondary pointing menu ${S.nav}`}>
            <div className="ui container">

                <Link to="/"
                    className={`header item`}
                >Noods</Link>

                <NavLink exact to="/"
                    className={`item`}
                    activeClassName="active"
                >首页</NavLink>

                <div className="menu right">
                    {userLink}
                    <NavLink to="/write"
                        className={`item`}
                        activeClassName="active"
                    >写文章</NavLink>
                </div>
            </div>
        </div>
    );
}
Nav.propTypes = propTypes;
