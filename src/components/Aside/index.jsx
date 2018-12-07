import Menu from './Menu';
import Logo from './Logo';
export default class Aside extends React.PureComponent {
    render() {
        return (
            <>
                <Logo title={APP_NAME} />
                <Menu theme={this.props.theme} flattenMenu={this.props.flattenMenu} menuData={this.props.menuData} />
            </>
        );
    }
}
