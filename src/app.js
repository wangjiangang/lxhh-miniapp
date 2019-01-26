import {showLoading, checkNetwork, request, showToast} from './utils/util';
import requestUrl, { env } from './config/config';

App({
    globalData: {},
    env: {
        toMiniProgram: env.prod ? 'release' : 'trial',
        isIphoneX: false
    },
    network: {
        watchNetworkStatus: false,
        networkType: null
    },
    onLaunch: function() {
        checkNetwork();
        this.onNetworkStatusChange();
        wx.getSystemInfo({
            success: res => {
                if (res.model === 'iPhone X') {
                    this.env.isIphoneX = true;
                }
            }
        });
        if(wx.cloud) {
            wx.cloud.init({
                env: 'text',
                traceUser: true
            });
        } else {
            console.error('版本太低，不具备云开发能力');
        }
    },

    // 获取用户信息
    getUserInfo: function(cb, authFail) {
        const userInfo = this.globalData.userInfo;
        if (userInfo) {
            typeof cb === 'function' && cb(userInfo);
            return;
        }

        wx.login({
            success: loginRes => {
                const {
                    code
                } = loginRes;

                // 获取用户头像及昵称
                wx.getUserInfo({

                    //  授权登录
                    success: userinfoRes => {
                        const id = 1;
                        const {
                            iv,
                            userInfo,
                            encryptedData
                        } = userinfoRes;

                        showLoading('授权登录中');

                        request({
                            url: `${requestUrl}/account/login`,
                            method: 'POST',
                            data: {
                                id, code, iv, encryptedData
                            },
                            success: (res) => {
                                userInfo.token = res.token;
                                userInfo.isLogin = true;
                                this.globalData.userInfo = userInfo;
                                typeof cb === 'function' && cb(userInfo);
                            },
                            complete: () => {
                                wx.hideLoading();
                            }
                        });
                    },

                    //  没授权提示授权
                    fail: () => {
                        wx.showModal({
                            title: '需要登录',
                            content: '请点击确定，允许微信授权',
                            confirmText: '确定',
                            success: (res) => {
                                if (res.confirm) {
                                    wx.openSetting({
                                        success: (res) => {
                                            if (res.authSetting['scope.userInfo']) {
                                                this.getUserInfo(cb);
                                            } else {
                                                typeof authFail === 'function' && authFail();
                                            }
                                        },
                                        fail: () => {
                                            typeof authFail === 'function' && authFail();
                                        }
                                    });
                                } else {
                                    typeof authFail === 'function' && authFail();
                                }
                            }
                        });
                    }
                });
            },
            fail: () => {
                checkNetwork();
            }
        });
    },
    onNetworkStatusChange: function() {
        const mobileNetworkTypes = ['2g', '3g', '4g', 'unknown'];
        wx.onNetworkStatusChange(res => {
            const {
                networkType
            } = res;
            const {
                networkType: oldNetworkType
            } = this.network;

            console.log(networkType, oldNetworkType);

            if (networkType === oldNetworkType) return;
            if (mobileNetworkTypes.includes(networkType) && mobileNetworkTypes.includes(oldNetworkType)) return;

            this.network.networkType = networkType;

            if (!this.network.watchNetworkStatus) return;

            if (networkType !== 'wifi' && networkType !== 'none') {
                showToast('已切换为移动网络', false);
            } else
            if(networkType === 'wifi') {
                showToast('已切换为wifi网络', false);
            }
        });
    }
});
