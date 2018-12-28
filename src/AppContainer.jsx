import { LocaleProvider } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BasicLayout from 'layouts/BasicLayout';
import LoginLayout from 'pages/login';
import { zhCN } from 'i18n/zh-CN';
import 'helper/request';

const Container = () => (
    <LocaleProvider locale={zhCN}>
        <div className="container-wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginLayout} exact />
                    <Route path="/admin" component={BasicLayout} strict />
                </Switch>
            </BrowserRouter>
        </div>
    </LocaleProvider>
);
export default Container;
