import { Table, Card } from 'antd';
import Star from 'components/Star';

export default class Home extends React.PureComponent {
    componentDidMount() {
        // this.throttled = debounce(this.handleChange, 1000);
    }
    render() {
        const data = [];
        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no. ${i}`
            });
        }

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Age',
                dataIndex: 'age'
            },
            {
                title: 'Address',
                dataIndex: 'address'
            }
        ];
        return (
            <Card>
                <br />
                <div>
                    <div>
                        <Star value={0.1} />
                        <br />
                        <Star value={0.2} />
                        <br />
                        <Star value={0.3} />
                        <br />
                        <Star value={0.4} />
                        <br />
                        <Star value={0.5} />
                        <br />
                        <Star value={0.6} />
                        <br />
                        <Star value={0.7} />
                        <br />
                        <Star value={0.8} />
                        <br />
                        <Star value={0.9} />
                        <br />
                        <Star value={1.4} />
                        <br />
                        <Star value={3.4} />
                        <br />
                        <Star value={4.5} />
                        <br />
                        <Star />
                        <br />
                    </div>
                </div>
                <br />
                <Table pagination={{ pageSize: 200 }} dataSource={data} columns={columns} />
            </Card>
        );
    }
}
