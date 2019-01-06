import styles from './styles.less';

export default class Star extends React.PureComponent {
    static defaultProps = {
        value: 0
    };
    formatNumber = (v = 0) => {
        return v.toString().split('.');
    };
    renderDecimalStar(v) {
        return v && v > 0 && <span className={styles[`star-${v}`]} />;
    }
    renderFullStar(v) {
        if (!v || !v.length) return null;
        return v.map((item, index) => <span className={styles.full} key={index} />);
    }
    renderZeroStarItems(v, decimal) {
        const zeroStarItemsLength = decimal && decimal > 0 ? 4 : 5;
        const zeroStarItems = Array.from({ length: zeroStarItemsLength - v.length });
        return zeroStarItems.map((item, index) => <span key={index} />);
    }
    render() {
        const { value } = this.props;
        const [int, decimal] = this.formatNumber(value);
        const fullStarItems = Array.from({ length: int });
        return (
            <>
                <span className={classNames(styles.stars)}>
                    {this.renderFullStar(fullStarItems)}
                    {this.renderDecimalStar(decimal)}
                    {this.renderZeroStarItems(fullStarItems, decimal)}
                </span>
                <span className={styles.demo}>{value && value.toFixed(1)}</span>
            </>
        );
    }
}
