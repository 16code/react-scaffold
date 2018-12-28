import { Switch, withRouter, Route } from 'react-router-dom';
const HomeRoute = asyncComponent(() => import(/* webpackChunkName: "notice-route" */ 'pages/home'));

@withRouter
export default class Routes extends React.PureComponent {
    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route path={`${match.url}/`} component={HomeRoute} exact />
            </Switch>
        );
    }
}
