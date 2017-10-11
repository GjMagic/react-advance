
import SignInPanel from 'components/user/SignInPanel';
import EntryPanel from 'components/user/Panel';
import PropTypes from 'prop-types'

let propTypes = {
    signInAjax: PropTypes.func,
    signInMsg: PropTypes.object,
    clearResInfo:PropTypes.func
}

export default class SignIn extends React.Component{
    constructor(props){
        super(props);
    }

    // 清除错误提示信息
    componentWillUnmount() {
        this.props.clearResInfo();
    }
    
    render(){

        let { signInAjax, signInMsg } = this.props;
        return (
            <EntryPanel >
                <SignInPanel {...{ 
                    signInAjax, 
                    signInMsg
                }} />
            </EntryPanel>
        );
    }
}

SignIn.propTypes = propTypes;
