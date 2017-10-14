import {Link} from 'react-router-dom';
import S from './style.scss';
import Author from './Author';

export default function Recommend(props){
    let {authors, homeAuthorClick} = props;
    return (
        <div className={S.recommend}>
            <div className={S.title}>
                <span>作者列表</span>
            </div>
            <div className="ui items">
                {
                    authors.map((item, i)=>{
                        return (
                            <Author
                                {...{
                                    user: item,
                                    homeAuthorClick
                                }}
                                key={i}
                            />);
                    })
                }
            </div>
        </div>
    );
}

Recommend.propTypes = {
    authors: PT.array,
    homeAuthorClick: PT.func
}