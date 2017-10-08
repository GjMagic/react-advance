
import SignInPanel from 'components/user/SignInPanel';
import EntryPanel from 'components/user/Panel';

export default class SignIn extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        return (
            <EntryPanel >
                <SignInPanel />
            </EntryPanel>
        );
    }
}
