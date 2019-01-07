/**
 * 根据参数使用不同的接口地址
 *
 * @type {Boolean}    prod    是否生产环境
 * @type {Boolean}    mock    是否使用mock数据
 */
const prod = true, mock = false;

let requestUrl, requestDomain;

const prodDomain = '';
const testDomain = '';
const mockUrl    = '';

const requestPath = '/api/mini-program';

requestDomain = prod ? prodDomain : testDomain;
requestUrl = mock ? mockUrl : requestDomain + requestPath;

export default requestUrl;

export const env = {
    prod,
    mock
};

export const domain = requestDomain;

export const goodsBaseUrl = 'http://pkxy1x237.bkt.clouddn.com/image';
