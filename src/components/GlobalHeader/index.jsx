import { Icon, Dropdown, Menu, Avatar } from 'antd';

export default class GlobalHeader extends React.PureComponent {
    handleMenuClick = ({ key }) => {
        const { onMenuClick } = this.props;
        onMenuClick && onMenuClick(key);
    };
    render() {
        const { onToggle, collapsed } = this.props;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="changeTheme">
                    <Icon type="skin" />
                    更换主题
                </Menu.Item>
                <Menu.Item key="profile">
                    <Icon type="idcard" />
                    个人设置
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="poweroff" />
                    退出登陆
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="global-header">
                <span className="menu-trigger" onClick={onToggle}>
                    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                </span>
                <div className="global-header-right">
                    <Dropdown overlay={menu} placement="bottomRight">
                        <span className="action account">
                            <Avatar size="small" className="avatar" src={require('assets/face.png')} alt="avatar" />
                            <span className="name">Jerry</span>
                        </span>
                    </Dropdown>
                </div>
            </div>
        );
    }
}
