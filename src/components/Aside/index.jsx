import { Layout } from 'antd';
import Menu from './Menu';
import Logo from './Logo';
export default class Aside extends React.PureComponent {
    render() {
        const { collapsed, theme, menuData } = this.props;
        return (
            <Layout.Sider collapsed={collapsed} theme={theme} className="layout-sider">
                <Logo
                    title={APP_NAME}
                    className={classNames(theme, {
                        collapsed: collapsed
                    })}
                />
                <Menu inlineCollapsed={collapsed} theme={theme} menuData={menuData} />
            </Layout.Sider>
        );
    }
}
