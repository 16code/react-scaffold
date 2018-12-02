import AppContainer from './AppContainer';

const rootElement = document.getElementById('root');
const render = Component => {
    ReactDOM.render(
        <div className="container-wrapper">
            <Component />
        </div>,
        rootElement
    );
};
render(AppContainer);
