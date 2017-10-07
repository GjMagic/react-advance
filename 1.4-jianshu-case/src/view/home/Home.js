import PreviewList from 'preview/PreviewList';
import Recommend from 'components/home/Recommend';
import cfg from 'config/config.json'
import Axios from 'axios'

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            previews: [],
            authors: []
        }
    }

    componentDidMount() {
        // 获得preview数据
        Axios
        .post(`${cfg.url}/getPreview`)
        .then(res => {
            if(res.data.code === 0) {
                this.setState({
                    previews: res.data.data
                })
            }
        })
        .catch(error => {
            console.log(error)
        })

        // 获得author数据
        Axios
        .post(`${cfg.url}/getAuthor`)
        .then(res => {
            console.log(res)
            if(res.data.code === 0) {
                this.setState({
                    authors: res.data.data
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){

        let { previews, authors } = this.state

        return (
            <div className="ui container grid">
                <div className="column twelve wide">
                    <PreviewList
                        {...{
                            previews
                        }}
                    />
                </div>
                <div className="column four wide">
                    <Recommend 
                        {...{
                            authors
                        }}
                    />
                </div>
            </div>
        );
    }
}
