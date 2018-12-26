import { Spin, Form, Select } from 'antd';
import VideoList from 'components/VideoList';
import { objToUrlParams, queryString } from 'helper';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        const search = queryString(props.location.search);
        const pager = { pageSize: 20 };
        pager.current = +search.page || 1;
        this.state = {
            dataSource: [],
            query: {},
            pager
        };
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        const { query, pager } = this.state;
        const params = Object.assign({}, query, pager);
        params.page = params.current;
        this.setState({ loading: true });
        fetch(`/api/list?${objToUrlParams(params)}`).then(response => {
            const { data, meta } = response;
            this.setState(
                {
                    dataSource: data,
                    loading: false,
                    pager: {
                        total: meta.total,
                        current: meta.page
                    }
                },
                () => {
                    const s = document.getElementById('scroll');
                    s.scrollIntoView({
                        block: 'start'
                    });
                }
            );
        });
    }
    handlePageSizeChange = page => {
        const { history } = this.props;
        const pager = { ...this.state.pager };
        history.push({
            pathname: '/',
            search: `page=${page}`
        });
        pager.current = page;
        this.setState({ pager }, () => this.loadData());
    };
    handleSubmit = v => {
        const values = {
            category: v
        };
        if (v === 'm') {
            values.category = 'top';
            values.m = -1;
        } else if (v === 'all') {
            delete values.category;
        }
        this.setState(
            {
                query: values
            },
            this.loadData
        );
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const categoryMapper = {
            hot: '当前最热',
            rp: '最近得分',
            rf: '最近加精',
            long: '10分钟以上',
            md: '本月讨论',
            tf: '本月收藏',
            top: '本月最热',
            mf: '收藏最多',
            hd: '高清',
            m: '上月最热' // 参数-1
        };
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('category', {
                            initialValue: 'all'
                        })(
                            <Select style={{ width: 200 }} onChange={this.handleSubmit}>
                                <Option value="all">全部影片</Option>
                                {Object.keys(categoryMapper).map(key => (
                                    <Option value={key} key={key}>
                                        {categoryMapper[key]}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </FormItem>
                </Form>
                <Spin spinning={this.state.loading}>
                    <VideoList
                        pager={this.state.pager}
                        dataSource={this.state.dataSource}
                        onPagesizeChange={this.handlePageSizeChange}
                    />
                </Spin>
            </div>
        );
    }
}
