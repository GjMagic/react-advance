
export default class LoginHint extends React.Component {

    componentDidMount() {
        let {history} = this.props; // history通过component带过来
        setTimeout(() => {
            history.push('/sign_in');
        },1000)
    }

    render() {
        return (
            <div className="ui aligned huge teal center header">
                <div className="ui active inverted dimmer">
                    <div className="ui large text loader">请先登录，即将自动跳转！</div>
                </div>
            </div>
        );
    }
}