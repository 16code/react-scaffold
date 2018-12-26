import cloneDeep from 'lodash/cloneDeep';
const toString = Object.prototype.toString;
function isArray(value) {
    return Array.isArray(value) || value instanceof Array || toString.call(value) === '[object Array]';
}
function isFunction(value) {
    return typeof value === 'function';
}
function isObject(value) {
    return (value !== null && typeof value === 'object') || toString.call(value) === '[object Object]';
}

export function urlToList(url) {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}

export function objToUrlParams(obj) {
    const keys = Object.keys(obj).filter(key => !/undefined|null/i.test(Object.prototype.toString.call(obj[key])));
    const data = keys.map(key => {
        if (Array.isArray(obj[key])) {
            const arrString = obj[key].map(a => `${encodeURIComponent(key)}=${encodeURIComponent(a)}`);
            return arrString.join('&');
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
    });
    return data.join('&');
}

export function queryString(str) {
    const output = {};
    if (!str && str === '') return output;
    const replacedStr = str.replace('?', '');
    const strArr = replacedStr.split('&');
    strArr.forEach(s => {
        const [key, val] = s.split('=');
        output[key] = val;
    });
    return output;
}

export default {
    isArray,
    isObject,
    isFunction,
    cloneDeep,
    urlToList
};
