import { LocaleProvider, DatePicker } from 'antd';
import Test from 'components/Test';
import { zhCN } from 'i18n/zh-CN';
window.onerror = function(errorMessage, scriptURI, lineNo, columnNo, error) {
    const errorObj = {
        errorMessage: errorMessage || null,
        scriptURI: scriptURI || null,
        lineNo: lineNo || null,
        columnNo: columnNo || null,
        stack: error && error.stack ? error.stack : null
    };
    console.log(errorObj);
};
const dateNow = +moment();
const Container = () => (
    <LocaleProvider locale={zhCN}>
        <div>
            <DatePicker />
            <br />
            {dateNow}
            <Test />
        </div>
    </LocaleProvider>
);
export default Container;
