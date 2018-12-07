import { Layout } from 'antd';
import Aside from 'components/Aside';
import { createUserMenu, createFlattenMenu } from 'config/menu.config';
import AuthContext from 'config/auth.context';
import ThemeContext from 'config/theme.context';
const { Header, Content, Footer, Sider } = Layout;

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
                        <ThemeContext.Consumer>
                            {({ siderTheme, width, collapsed }) => (
                                <Sider width={width} collapsed={collapsed} theme={siderTheme} className="layout-sider">
                                    <Aside
                                        theme={siderTheme}
                                        menuData={createUserMenu(signedInUser.role)}
                                        flattenMenu={createFlattenMenu()}
                                    />
                                </Sider>
                            )}
                        </ThemeContext.Consumer>
                        <Layout className="layout-container">
                            <Header className="layout-header">
                                <div className="global-header">Header</div>
                            </Header>
                            <Content>Content</Content>
                            <Footer>Footer</Footer>
                        </Layout>
                    </Layout>
                </AuthContext.Provider>
            </ThemeContext.Provider>
        );
    }
}
