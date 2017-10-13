
import {Link} from 'react-router-dom';
import S from './style.scss';

let propTypes = {
    userInfo: PT.object
}

export default function AuthorInfo(props) {

    let {user_name, avatar} = props.userInfo;

    return (
        <div className={S.author_info}>
            <Link 
                to="/my_page"
                className={S.avatar}
            >
                <img src={avatar} alt="" />
            </Link>
            <div className={S.title}>
                <Link to="/my_page" className={S.name}>
                    {user_name}
                </Link> 
            </div>
        </div>
    )
}