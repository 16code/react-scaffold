import { Layout } from 'antd';

// const { Header, Content, Footer, Sider } = Layout;

export default class BasicLayout extends React.PureComponent {
    render() {
        return (
            <Layout>
                <Layout.Sider className="layout-sider">Sider</Layout.Sider>
                <Layout style={{ minHeight: '100vh' }}>
                    <Layout.Header className="layout-header">Header</Layout.Header>
                    <Layout.Content>Content</Layout.Content>
                    <Layout.Footer>Footer</Layout.Footer>
                </Layout>
            </Layout>
        );
    }
}
