import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import helper from 'helper';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

@withRouter
export default class Aside extends React.PureComponent {
    constructor(props) {
        super(props);
        const opendKeys = this.getDefaultOpenKeys(props);
        this.state = {
            opendKeys,
            selectedKeys: [opendKeys[opendKeys.length - 1]]
        };
    }
    handleMenuSelect = ({ key }) => {
        const keyLength = helper.urlToList(key).length;
        this.setState(
            prev => ({
                selectedKeys: [key],
                opendKeys: keyLength === 0 || keyLength === 1 ? [] : prev.opendKeys
            }),
            () => {
                this.props.history.push({
                    pathname: key
                });
            }
        );
    };
    handleOpenChange = openKeys => {
        const lastKey = openKeys[openKeys.length - 1];
        this.setState({
            opendKeys: [lastKey]
        });
    };
    checkRole(userRole, routeRole) {
        if (!routeRole) return true;
        if (!userRole) return false;
        return userRole.some(u => routeRole.includes(u));
    }
    renderMenuItem = item => {
        return (
            <MenuItem key={item.path}>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.title}</span>
            </MenuItem>
        );
    };
    renderSubMenu = item => {
        return (
            <SubMenu
                key={item.path}
                title={
                    <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </span>
                }
            >
                {item.children.map(this.renderMenuItem)}
            </SubMenu>
        );
    };
    getDefaultOpenKeys() {
        const { location } = this.props;
        const opendKeys = helper.urlToList(location.pathname);
        return opendKeys;
    }
    render() {
        const { menuData, theme } = this.props;
        const { opendKeys, selectedKeys } = this.state;
        return (
            <Menu
                theme={theme}
                openKeys={opendKeys}
                selectedKeys={selectedKeys}
                mode="inline"
                onSelect={this.handleMenuSelect}
                onOpenChange={this.handleOpenChange}
            >
                {menuData.map(item => (item.children ? this.renderSubMenu(item) : this.renderMenuItem(item)))}
            </Menu>
        );
    }
}
