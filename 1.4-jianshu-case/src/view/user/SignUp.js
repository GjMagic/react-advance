
import SignUpPanel from 'components/user/SignUpPanel';
import EntryPanel from 'components/user/Panel';
import PropTypes from 'prop-types'

let propTypes = {
    signUpAjax: PropTypes.func,
    signUpMsg: PropTypes.object
}

export default class SignUp extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        let {signUpAjax, signUpMsg} = this.props;

        return (
            <EntryPanel >
                <SignUpPanel {...{
                    signUpAjax,
                    signUpMsg
                }} />
            </EntryPanel>
        );
    }
}

SignUp.propTypes = propTypes;