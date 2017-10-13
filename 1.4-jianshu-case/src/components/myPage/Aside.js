
import S from './style.scss';
let propTypes = {
    notebooks: PT.array,
    userInfo: PT.object
}

export default class Aside extends React.Component {

    render() {
        let {notebooks} = this.props;
        let {user_intro} = this.props.userInfo;

        notebooks = notebooks.map((item, i) => {
            let {id: collection_id, collection_name} = item;
            return (
                <div className="item" key={i}>
                    <i className="book icon"></i>
                    <div className="content">
                        {collection_name}
                    </div>
                </div>
            )   
        })

        return (
            <div className={S.aside}>
                <div className="introduce">
                    <div className="title">
                        个人介绍
                        <div className="ui divider hidden"></div>
                        <p>{user_intro}</p>
                    </div>
                </div>
                <div className="ui divider hidden"></div>
                <div className={S.volume}>
                    <div className={S.title}>
                        我的文集
                    </div>
                    <div className="ui list">
                        {notebooks}
                    </div>
                </div>
            </div>
        );
    }
}

Aside.propTypes = propTypes;