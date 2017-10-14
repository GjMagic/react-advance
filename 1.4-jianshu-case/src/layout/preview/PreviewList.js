import {Link} from 'react-router-dom';
import Preview from './Preview';
import S from './style.scss';
import cfg from 'config/config.json'

let propTypes = {
    previews: PT.array,
    initMyPage: PT.func,
    collectionClick: PT.func
}

export default function PreviewList(props){

    let {previews, initMyPage, collectionClick} = props;

    previews = previews.map((item, i)=>{
        let {
            id: article_id, article_title, createdAt,
            preview: previewContent,
            collection_name,
            user_id,
            collection_id,
            user
        } = item;

        let {avatar, user_name, user_intro} = user;

        avatar = cfg.url + avatar;
        
        return (
            <Preview
                {...{
                    article_id,
                    article_title,
                    previewContent,
                    user_id,
                    user_name,
                    createdAt,
                    avatar,
                    user_intro,
                    initMyPage
                }}
                key={i}
            >
                {collection_id ? (
                    <Link 
                        to="/my_page"
                        className={S.tag}
                        onClick={ev => {
                            ev.stopPropagation();
                            ev.preventDefault();
                            collectionClick && collectionClick(
                                collection_id, 
                                collection_name, 
                                { // 哪一个用户的文集
                                    user_id,
                                    user_name,
                                    avatar,
                                    user_intro
                                }
                            )
                        }}
                    >{collection_name}</Link>
                ) : null}
            </Preview>
        );
    });

    return (
        <div>
            {previews}
        </div>
    );
}

PreviewList.propTypes = propTypes;