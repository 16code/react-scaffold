import AppContainer from './AppContainer';

const rootElement = document.getElementById('root');
const render = Component => {
    ReactDOM.render(<Component />, rootElement);
};
render(AppContainer);
