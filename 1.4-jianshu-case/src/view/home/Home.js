import PreviewList from 'preview/PreviewList';
import Recommend from 'components/home/Recommend';
/* import Banner from 'components/home/Banner'; */
import cfg from 'config/config.json';
import Axios from 'axios';

let propTypes = {
    initMyPage: PT.func
}

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            previews: [],
            authors: []
        }
        this.collectionClick = this.collectionClick.bind(this);
        this.homeAuthorClick = this.homeAuthorClick.bind(this);
    }

    // 点击文集进入my_page
    collectionClick(collection_id, collection_name, userInfo) {
        let {history, initMyPage} = this.props; 
        history.push('/my_page', {userInfo});
        initMyPage(userInfo.user_id, {collection_id}, collection_name);
    }

    // 点击Author组件的头像进入my_page页
    homeAuthorClick(user) {
        let {history, initMyPage} = this.props;
        let {user_id, user_name} = user;
        history.push('/my_page', {userInfo: user});
        initMyPage(user_id, {user_id}, user_name);
    }

    componentDidMount() {
        // 获得preview数据
        Axios
        .post(`${cfg.url}/getPreview`)
        .then(res => {
            if(res.data.code === 0) {
                this.setState({
                    previews: res.data.data
                })
            }
        })
        .catch(error => {
            console.log(error)
        })

        // 获得author数据
        Axios
        .post(`${cfg.url}/getAuthor`)
        .then(res => {
            if(res.data.code === 0) {
                this.setState({
                    authors: res.data.data
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){

        let { collectionClick, homeAuthorClick } = this;

        let { previews, authors } = this.state

        let { initMyPage } = this.props;

        return (
            <div className="ui container grid">
                <div className="column twelve wide">
                    <PreviewList
                        {...{
                            previews,
                            initMyPage,
                            collectionClick
                        }}
                    />
                </div>
                <div className="column four wide">
                    <Recommend 
                        {...{
                            authors,
                            homeAuthorClick
                        }}
                    />
                </div>
            </div>
        );
    }
}

Home.propTypes = propTypes;