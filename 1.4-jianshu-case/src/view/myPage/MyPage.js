import AuthorInfo from 'components/myPage/AuthorInfo'
import Aside from 'components/myPage/Aside'
import PreviewList from 'preview/PreviewList'

import PropTypes from 'prop-types'

let propTypes = {
    previewsName: PropTypes.string,
    myPagePreview: PropTypes.array,
    notebooks: PropTypes.array,
    location: PropTypes.object,
    changePreviews: PropTypes.func
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
            changePreviews
        } = this.props;
        
        let {collectionClick} = this;

        let {userInfo} = location.state;

        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo 
                        {...{
                            userInfo
                        }}
                    />
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewsName}
                        </span>
                    </div>
                    <PreviewList {...{
                        previews: myPagePreview,
                        collectionClick
                    }} />
                </div>
                <div className="four wide column">
                    <Aside {...{
                        notebooks,
                        userInfo,
                        changePreviews
                    }} />
                </div>
            </div>
        );
    }
}

MyPage.propTypes = propTypes;
export default MyPage;