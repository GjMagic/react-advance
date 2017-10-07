import {Link} from 'react-router-dom';
import cfg from 'config/config.json'

export default function Author({user}){
    let {user_name, avatar} = user;

    avatar = cfg.url + avatar;

    return (
        <div className="item">
            <Link
                to="/"
                className="ui mini avatar image"
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
