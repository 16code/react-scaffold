import { Card, Col, Row, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import styles from './styles';
const { Meta } = Card;
export default class VideoList extends React.PureComponent {
    handlePageSizeChange = page => {
        this.props.onPagesizeChange && this.props.onPagesizeChange(page);
    };
    renderDescription(data) {
        return (
            <span>
                <span>{data.date}</span>
                <span>{data.views}</span>
            </span>
        );
    }
    renderCover(item) {
        return (
            <>
                <img alt="example" src={item.thumb} />
                <span className={styles.duration}>{item.info.duration}</span>
            </>
        );
    }
    renderList() {
        const { dataSource } = this.props;
        return dataSource.map(item => (
            <Col key={item.id} span={6}>
                <Card className={styles.card} hoverable cover={this.renderCover(item)}>
                    <Meta
                        title={
                            <Link target="_video" to={`/video/${item.id}`}>
                                {item.name}
                            </Link>
                        }
                        description={this.renderDescription(item.info)}
                    />
                </Card>
            </Col>
        ));
    }
    renderPagination() {
        const { pager } = this.props;
        return <Pagination onChange={this.handlePageSizeChange} {...pager} />;
    }
    render() {
        return (
            <Row gutter={16}>
                <div id="scroll" className={styles.scroll}>
                    {this.renderList()}
                    <div className={styles.pager}>{this.renderPagination()}</div>
                </div>
            </Row>
        );
    }
}
