import {Link, withRouter} from 'react-router-dom';
import S from './style.scss';

function Preview(props){ 
    // withRouter的作用是把此组件升级为高阶组件，它的props里面就有了history对象
    let {
        article_id,
        article_title,
        previewContent,
        user_id,
        user_name,
        createdAt,
        avatar,
        user_intro,
        initMyPage,
        history
    } = props;

    createdAt = new Date(createdAt).toLocaleString();

    return (
        <div className={`${S.note}`}>
            <div className="ui divider hidden"></div>
            <div className={`${S.content}`}>
                <div className={`${S.author}`}>
                    <Link 
                        to="/my_page"
                        className="avatar"
                        onClick={ev => {
                            ev.stopPropagation();
                            ev.preventDefault();
                            history.push('/my_page'); // 利用history对象跳转页面
                            initMyPage();
                        }}
                    >
                        <img src={avatar} alt="" className="ui avatar image"/>
                    </Link>
                    <div className={`${S.name}`}>
                        <Link to="/">{user_name}</Link>
                        <span className="time">{createdAt}</span>
                    </div>
                </div>
                <Link to="/" className={S.title}>{article_title}</Link>
                <p className={S.abstract}>
                    {previewContent}
                </p>
                <div className={S.meta}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default withRouter(Preview)