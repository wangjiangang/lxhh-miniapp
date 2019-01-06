export function isEmptyObject(obj) {
    let name;
    for ( name in obj ) {
        return false;
    }
    return true;
}

/**
 * @description 从字符数中解析出电话和手机号码，并以数组形式返回
 * @param string
 * @return {Array}
 */

export function parsePhoneNumberForString(string = '') {
    let retData = [];
    const phoneReg = /(13[0-9]\d{8}|14[5|7]\d{8}|15[0|1|2|3|5|6|7|8|9]\d{8}|18[0-9]\d{8}|17[0-9]\d{8})/g,
        telReg1  = /(0\d{2}-?\d{8})/g,
        telReg2  = /(0\d{3}-?\d{7})/g;

    string = string.replace(phoneReg, '<phone>$1<phone>');
    string = string.replace(telReg1, '<phone>$1<phone>');
    string = string.replace(telReg2, '<phone>$1<phone>');

    string.split('<phone>').forEach(item => {
        if (phoneReg.test(item) || telReg1.test(item) || telReg2.test(item)) {
            retData.push({
                type: 'phone',
                content: item
            });
        } else {
            retData.push({
                type: 'string',
                content: item
            });
        }
    });

    return retData;
}

export function showToast(title, mask, options = {}) {
    if (arguments.length === 2 && Object.prototype.toString.call(mask) === '[object Object]') {
        options = mask;
        mask = undefined;
    }
    if (mask === undefined) mask = true;

    wx.showToast(Object.assign({
        title,
        icon: 'none',
        duration: 2000,
        mask
    }, options));
}

export function showLoading(title, mask = true) {
    wx.showLoading({
        title,
        mask
    });
}

/**
 * 日期时间格式化
 *
 * @param   {Date, Number} date        日期对象，或时间戳
 * @returns {string}
 */
export function formatTime(date) {
    date = Object.prototype.toString.call(date) === '[object Date]' ? date : new Date(+date);
    const year   = date.getFullYear();
    const month  = date.getMonth() + 1;
    const day    = date.getDate();
    const hour   = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

/**
 * 时间补零
 *
 * @param   n
 * @returns {any}
 */
export function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

/**
 * 网络超时
 */
export function checkNetwork() {
    wx.getNetworkType({
        success: (res) => {
            if (res.networkType === 'none') {
                errorModal('网络', '由于网络问题，即将退出小程序！', () => {
                    wx.navigateBack();
                });
            }
        }
    });
}

export function errorModal(title, content, success, fail) {
    wx.showModal({
        title: `${title}`,
        content: `${content}`,
        confirmText: '确定',
        showCancel: false,
        success: res => {
            typeof success === 'function' && success(res);
        },
        fail: err => {
            typeof fail === 'function' && fail(err);
        }
    });
}

/**
 * 把金额由<分>转为<元>
 *
 * @param   {Number}    fen    分
 * @returns {number}
 */
export function parsePrice(fen) {
    return fen / 100;
}

/**
 * request请求封装
 * @param params
 */
export function request(params) {
    const app      = getApp();
    const userInfo = app.globalData.userInfo || {};
    const token    = userInfo.token || '';
    const success  = params.success,
        fail     = params.fail,
        complete = params.complete;

    delete params.success;
    delete params.fail;
    delete params.complete;

    params.success = res => {
        if (res.statusCode === 200) {
            typeof success === 'function' && success(res.data);
        } else {
            errorModal('注意', res.statusCode);
        }
    };
    params.fail = error => {
        errorModal('网络', error.errMsg);
        typeof fail === 'function' && fail();
    };
    params.complete = () => {
        typeof complete === 'function' && complete();
    };

    params.header = {
        'Authorization': `Bearer ${token}`,
    };

    wx.request(params);
}

/**
 * 需要登录之后才能调的接口
 *
 * @param {Object}      params      request参数
 * @param {Function}    authFail    授权失败处理函数
 */
export function safeRequest(params, authFail) {
    const app = getApp();
    app.getUserInfo(() => {
        request(params);
    }, authFail);
}

/**
 * 接口请求函数生成器
 *
 * @param   {Object}      options              request参数
 * @param   {Function}    formatHandler        参数格式化函数
 * @returns {Promise<any>}
 */
export function generateApi(options, formatHandler) {
    const success = options.success,
        fail    = options.fail;
    delete options.success;
    delete options.fail;

    return new Promise((resolve, reject) => {
        options = Object.assign({
            method: 'GET',
            success: res => {
                typeof success === 'function' && success(res);
                resolve(res);
            },
            fail: err => {
                typeof fail === 'function' && fail(err);
                reject(err);
            },
        }, options);

        // 格式化参数
        if (typeof formatHandler === 'function') {
            options = formatHandler(options);
        }

        request(options);
    });
}

/**
 * safe接口请求函数生成器
 *
 * @param   {Object}      options              request参数
 * @param   {Function}    formatHandler        参数格式化函数
 * @returns {Promise<any>}
 */
export function generateSafeApi(options, formatHandler) {
    const success  = options.success,
        fail     = options.fail,
        authFail = options.authFail;

    delete options.success;
    delete options.fail;
    delete options.authFail;

    return new Promise((resolve, reject) => {
        options = Object.assign({
            method: 'POST',
            data: {},
            success: res => {
                typeof success === 'function' && success(res);
                resolve(res);
            },
            fail: err => {
                typeof fail === 'function' && fail(err);
                reject(err);
            },
        }, options);

        // 格式化参数
        if (typeof formatHandler === 'function') {
            options = formatHandler(options);
        }

        safeRequest(options, authFail);
    });
}
