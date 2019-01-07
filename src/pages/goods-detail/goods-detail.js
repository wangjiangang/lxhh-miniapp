import {goods} from '../../api/goods';
import {goodsBaseUrl} from '../../config/config';
Page({
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        bigPicModel: true,
        currentBigPic: null,
        currentGoods: null,
        goodsBaseUrl
    },
    onLoad: function(query) {
        const goodsId = +query.goodsId;
        if (!goodsId) {
            wx.navigateTo({
                url: '/pages/index/index'
            });
            return;
        }
        for(let i = 0;i < goods.length;i ++) {
            if (goodsId === goods[i].id) {
                this.setData({
                    currentGoods: goods[i]
                });
            }
        }
    },
    lookBigPic: function(e) {
        this.setData({
            currentBigPic: e.currentTarget.dataset.url,
            bigPicModel: false
        });
    },
    bigPicModelHide: function() {
        this.setData({
            bigPicModel: true
        });
    }
});
