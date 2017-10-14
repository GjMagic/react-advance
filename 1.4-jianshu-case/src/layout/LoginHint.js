
export default class LoginHint extends React.Component {

    componentDidMount() {
        let {history} = this.props; // history通过component带过来
        setTimeout(() => {
            history.push('/sign_in');
        },800)
    }

    render() {
        return (
            <div className="ui aligned center header">
                请先登录，即将自动跳转！
            </div>
        );
    }
}