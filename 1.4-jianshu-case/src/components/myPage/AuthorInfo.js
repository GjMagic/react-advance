
import {Link} from 'react-router-dom';
import S from './style.scss';

export default function AuthorInfo() {
    return (
        <div className={S.author_info}>
            <Link to="/my_page">
                <img src="" alt="" />
            </Link>
            <div className={S.title}>
                <Link to="/my_page" className={S.name}>
                    用户名
                </Link> 
            </div>
        </div>
    )
}