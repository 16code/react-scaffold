import { Switch, withRouter, Route } from 'react-router-dom';
const HomeRoute = asyncComponent(() => import(/* webpackChunkName: "notice-route" */ 'pages/home'));
const VideoRoute = asyncComponent(() => import(/* webpackChunkName: "notice-route" */ 'pages/Video'));

@withRouter
export default class Routes extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route path="/" component={HomeRoute} exact />
                <Route path="/video/:id" component={VideoRoute} exact />
            </Switch>
        );
    }
}
