
import SignUpPanel from 'components/user/SignUpPanel';
import EntryPanel from 'components/user/Panel';

export default class SignUp extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <EntryPanel >
                <SignUpPanel />
            </EntryPanel>
        );
    }
}
