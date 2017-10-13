import AuthorInfo from 'components/myPage/AuthorInfo'
import Aside from 'components/myPage/Aside'
import PreviewList from 'preview/PreviewList'

import PropTypes from 'prop-types'

let propTypes = {
    previewsName: PropTypes.string,
    myPagePreview: PropTypes.array,
    notebooks: PropTypes.array,
    location: PropTypes.object,
    collectionClick: PropTypes.func
}

class MyPage extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        let {
            previewsName, 
            myPagePreview, 
            notebooks,
            location
        } = this.props;
        
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
                        previews: myPagePreview
                    }} />
                </div>
                <div className="four wide column">
                    <Aside {...{
                        notebooks,
                        userInfo
                    }} />
                </div>
            </div>
        );
    }
}

MyPage.propTypes = propTypes;
export default MyPage;