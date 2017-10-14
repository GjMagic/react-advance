import AuthorInfo from 'components/myPage/AuthorInfo'
import Aside from 'components/myPage/Aside'
import PreviewList from 'preview/PreviewList'

import PropTypes from 'prop-types'

let propTypes = {
    previewsName: PropTypes.string,
    myPagePreview: PropTypes.array,
    notebooks: PropTypes.array,
    location: PropTypes.object,
    changePreviews: PropTypes.func,
    initMyPage: PropTypes.func,
    myInfo: PropTypes.object,
    updataMyIntro: PropTypes.func
}

class MyPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.collectionClick = this.collectionClick.bind(this);
    }
    
    // 点击my_page页的previews下的文集
    collectionClick(collection_id, collection_name, userInfo) {
        let {changePreviews} = this.props;
        changePreviews({collection_id}, collection_name);
    }

    render() {
        let {
            previewsName, 
            myPagePreview, 
            notebooks,
            location,
            changePreviews,
            initMyPage,
            myInfo,
            updataMyIntro
        } = this.props;
        
        let {collectionClick} = this;

        let {userInfo} = location.state;

        let isMe = false;
        if(myInfo) {
            isMe = myInfo.user_id === userInfo.user_id;
            userInfo = myInfo;
        }

        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo 
                        {...{
                            userInfo,
                            initMyPage
                        }}
                    />
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewsName}
                        </span>
                    </div>
                    <PreviewList {...{
                        previews: myPagePreview,
                        collectionClick,
                        initMyPage
                    }} />
                </div>
                <div className="four wide column">
                    <Aside {...{
                        notebooks,
                        userInfo,
                        changePreviews,
                        myInfo,
                        updataMyIntro,
                        isMe
                    }} />
                </div>
            </div>
        );
    }
}

MyPage.propTypes = propTypes;
export default MyPage;