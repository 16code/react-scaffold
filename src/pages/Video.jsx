export default class Video extends React.PureComponent {
    state = {};
    componentDidMount() {
        const { params } = this.props.match;
        if (params.id) {
            this.loadData(params.id);
        }
    }
    loadData(id) {
        fetch(`/api/video?id=${id}`).then(resp => {
            this.setState({
                dataSource: resp.src
            });
        });
    }
    render() {
        // const { params } = this.props.match;
        return this.state.dataSource ? (
            <video controls autoPlay width="1024" height="576">
                <source src={this.state.dataSource} />
            </video>
        ) : null;
    }
}
