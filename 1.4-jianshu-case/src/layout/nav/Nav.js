import { Link, NavLink} from 'react-router-dom';
import S from './style.scss';

export default function Nav(){

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
                    <NavLink to="/sign_in"
                        className={`item`}
                        activeClassName="active"
                    >登录</NavLink>

                    <NavLink to="/sign_up"
                        className={`item`}
                        activeClassName="active"
                    >注册</NavLink>

                    <NavLink to="/write"
                        className={`item`}
                        activeClassName="active"
                    >写文章</NavLink>
                </div>
            </div>
        </div>
    );
}
