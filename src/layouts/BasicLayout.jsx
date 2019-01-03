import { Layout, Row, Col } from 'antd';
import Pages from 'pages/index';
import Aside from 'components/Aside';
import GlobalHeader from 'components/GlobalHeader';
import AuthContext from 'config/auth.context';
import { basedMenu } from 'config/menu.config';
const { Header, Content } = Layout;

export default class BasicLayout extends React.PureComponent {
    state = {
        signedInUser: {
            name: 'Jerry',
            role: ['ROLE_DEVELOPER']
        },
        theme: window.localStorage.getItem('USER_THEME') || 'dark',
        siderCollapsed: window.localStorage.getItem('SIDER_COLLAPSED') === 'true'
    };
    handleToggleAside = () => {
        const { siderCollapsed } = this.state;
        const nextState = !siderCollapsed;
        this.setState({ siderCollapsed: nextState }, () => {
            window.localStorage.setItem('SIDER_COLLAPSED', nextState);
        });
    };
    handleMenuClick = key => {
        switch (key) {
            case 'changeTheme':
                this.changeTheme();
                break;

            default:
                break;
        }
    };
    changeTheme = () => {
        const { theme } = this.state;
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        this.setState({ theme: nextTheme }, () => {
            window.localStorage.setItem('USER_THEME', nextTheme);
        });
    };
    render() {
        const { signedInUser, theme, siderCollapsed } = this.state;
        return (
            <AuthContext.Provider value={signedInUser}>
                <Layout className="layout-global">
                    <Aside collapsed={siderCollapsed} theme={theme} menuData={basedMenu} />
                    <Layout>
                        <Header className="layout-header">
                            <GlobalHeader
                                collapsed={siderCollapsed}
                                onToggle={this.handleToggleAside}
                                onMenuClick={this.handleMenuClick}
                            />
                        </Header>
                        <Content className="layout-container">
                            <Row>
                                <Col span={24}>
                                    <Pages />
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Layout>
            </AuthContext.Provider>
        );
    }
}
