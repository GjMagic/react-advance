
import {Link, withRouter} from 'react-router-dom';
import S from './style.scss';

let propTypes = {
    userInfo: PT.object,
    initMyPage: PT.func
}

function AuthorInfo(props) {
    let {initMyPage, userInfo, history} = props;
    let {user_name, avatar, user_id} = userInfo;

    return (
        <div className={S.author_info}>
            <Link 
                to="/my_page"
                className={S.avatar}
                onClick={ev => {
                    ev.stopPropagation();
                    ev.preventDefault();
                    history.push('/my_page', {userInfo});
                    initMyPage(user_id, {user_id}, '所有文章');
                }}
            >
                <img src={avatar} alt="" />
            </Link>
            <div className={S.title}>
                <Link 
                    to="/my_page" 
                    className={S.name}
                    onClick={ev => {
                        ev.stopPropagation();
                        ev.preventDefault();
                        history.push('/my_page', {userInfo});
                        initMyPage(user_id, {user_id}, '所有文章');
                    }}
                >
                    {user_name}
                </Link> 
            </div>
        </div>
    )
}

export default withRouter(AuthorInfo);