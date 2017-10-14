import {Link} from 'react-router-dom';
import cfg from 'config/config.json'

export default function Author(props){
    let {user, homeAuthorClick} = props;
    let {id, user_name, avatar, user_intro} = user;
    avatar = cfg.url + avatar;

    user = {
        user_id: id,
        user_name,
        avatar,
        user_intro
    }

    return (
        <div className="item">
            <Link
                to="/my_page"
                className="ui mini avatar image"
                onClick={ev => {
                    ev.stopPropagation();
                    ev.preventDefault();
                    homeAuthorClick && homeAuthorClick(user)
                }}
            >
                <img src={avatar} alt=""/>
            </Link>
            <div className="content">
                <div className="header">
                    {user_name}
                </div>
            </div>
        </div>

    );
}

Author.propTypes = {
    user: PT.object,
    homeAuthorClick: PT.func
}