import { AppContainer as RootContainer } from 'react-hot-loader';
import AppContainer from './AppContainer';
const rootElement = document.getElementById('root');
// const { whyDidYouUpdate } = require('why-did-you-update');

// whyDidYouUpdate(React, { exclude: /Icon|Menu|Route|Switch|Aside|Sider|Animate|Trigger|Adapter|DOMWrap/ });
const render = Component => {
    ReactDOM.render(
        <RootContainer warnings={false}>
            <Component />
        </RootContainer>,
        rootElement
    );
};
render(AppContainer);
module.hot.accept('./AppContainer', () => render(AppContainer));
