import 'particles.js';
import { Input, Form, Button } from 'antd';
import styles from './styles.less';
import config from './particles.config.js';
@Form.create()
export default class Login extends React.PureComponent {
    componentDidMount() {
        // eslint-disable-next-line
        particlesJS('particles-effect', config);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <section className={styles.login}>
                <div className={styles['bg-effect']} />
                <div id="particles-effect" className={styles['particles-effect']} />
                <div className={styles.container}>
                    <h1 className={styles.title}>管理系统</h1>
                    <Form className={styles.form} onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }]
                            })(<Input size="large" placeholder="用户名" />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }]
                            })(<Input size="large" type="password" placeholder="密码" />)}
                        </Form.Item>
                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" block>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </section>
        );
    }
}
