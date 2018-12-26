const asyncComponent = getComponent => {
    class AsyncComponent extends React.Component {
        displayName = 'AsyncComponent';
        state = { Component: null };
        constructor() {
            super();
            this.unMount = false;
            this.componentRef = React.createRef();
        }
        async componentDidMount() {
            if (!this.state.Component) {
                const cmp = await getComponent().catch(e => {
                    console.info(e);
                });
                if (!this.unMount) {
                    this.setState({ Component: cmp.default });
                }
            }
        }
        shouldComponentUpdate(nextProps) {
            if (nextProps.location.pathname === this.props.location.pathname && !this.state.Component) {
                return true;
            }
            return nextProps.location.pathname !== this.props.location.pathname;
        }
        renderComponent(Component) {
            return <Component key="Component" ref={this.componentRef} {...this.props} />;
        }
        render() {
            const { Component } = this.state;
            return Component ? this.renderComponent(Component) : <div>loading</div>;
        }
    }
    return AsyncComponent;
};

export default asyncComponent;
