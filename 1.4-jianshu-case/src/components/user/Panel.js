import {NavLink} from 'react-router-dom';
import S from './style.scss';

export default function Panel({children}){
    return (
        <div className="ui stackable grid container center aligned">
            <div className={`six wide column ${S.main}`}>
                <h4 className={S.title}>
                    <div className={S['normal-title']}>
                        <NavLink 
                            to="/sign_in"
                            className={S.over}
                            activeClassName={S.active}
                        >登录</NavLink>
                        <b>·</b>
                        <NavLink 
                            to="/sign_up"
                            className={S.over}
                            activeClassName={S.active}
                        >注册</NavLink>
                    </div>
                </h4>
                {children}
            </div>
        </div>
    );
}
