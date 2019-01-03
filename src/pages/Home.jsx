import { Table, Card } from 'antd';

export default class Home extends React.PureComponent {
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
                <Table pagination={{ pageSize: 200 }} dataSource={data} columns={columns} />
            </Card>
        );
    }
}
