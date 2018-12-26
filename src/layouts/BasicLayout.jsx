import { Layout, Row, Col } from 'antd';
import Pages from 'pages/index';
import AuthContext from 'config/auth.context';
import ThemeContext from 'config/theme.context';
const { Header, Content } = Layout;

export default class BasicLayout extends React.PureComponent {
    state = {
        signedInUser: {
            name: 'Jerry',
            role: ['ROLE_DEVELOPER']
        },
        theme: {
            siderTheme: 'dark',
            collapsed: false,
            width: 240
        }
    };
    render() {
        const { signedInUser, theme } = this.state;

        return (
            <ThemeContext.Provider value={theme}>
                <AuthContext.Provider value={signedInUser}>
                    <Layout>
                        <Header className="layout-header">
                            <div className="global-header">Header</div>
                        </Header>
                        <Layout className="layout-container">
                            <Content>
                                <Row>
                                    <Col span={24}>
                                        <Pages />
                                    </Col>
                                </Row>
                            </Content>
                        </Layout>
                    </Layout>
                </AuthContext.Provider>
            </ThemeContext.Provider>
        );
    }
}
