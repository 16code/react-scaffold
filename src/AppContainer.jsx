import { LocaleProvider } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BasicLayout from 'layouts/BasicLayout';
import { zhCN } from 'i18n/zh-CN';
import 'helper/request';

// window.onerror = function(errorMessage, scriptURI, lineNo, columnNo, error) {
//     const errorObj = {
//         errorMessage: errorMessage || null,
//         scriptURI: scriptURI || null,
//         lineNo: lineNo || null,
//         columnNo: columnNo || null,
//         stack: error && error.stack ? error.stack : null
//     };
//     console.log(errorObj);
// };
const Container = () => (
    <LocaleProvider locale={zhCN}>
        <div className="container-wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={BasicLayout} />
                </Switch>
            </BrowserRouter>
        </div>
    </LocaleProvider>
);
export default Container;
