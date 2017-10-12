import AuthorInfo from 'components/myPage/AuthorInfo'
import Aside from 'components/myPage/Aside'
import PreviewList from 'preview/PreviewList'

import PropTypes from 'prop-types'

let propTypes = {
    previewsName: PropTypes.string,
    myPagePreview: PropTypes.array,
    notebooks: PropTypes.array
}

class MyPage extends React.Component {
        
    render() {
        let {
            previewsName, 
            myPagePreview, 
            notebooks
        } = this.props;
        
        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo />
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
                        notebooks
                    }} />
                </div>
            </div>
        );
    }
}

MyPage.propTypes = propTypes;
export default MyPage;