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
export default {
    isArray,
    isObject,
    isFunction,
    cloneDeep,
    urlToList
};
