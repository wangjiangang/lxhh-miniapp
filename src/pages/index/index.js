import {recommend} from '../../api/recommend';
import {meal} from '../../api/meal';
Page({
    data: {
        imgUrls: [
            '../../images/banner/banner01.jpg'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        recommendList: recommend,
        mealList: meal
    },
    toGoodsList: function() {
        wx.navigateTo({
            url: '/pages/goods-list/goods-list'
        });
    },
    toGoodsDetail: function(event) {
        wx.navigateTo({
            url: `/pages/goods-detail/goods-detail?goodsId=${event.currentTarget.dataset.id}`
        });
    },
    toBuyerReading: function() {
        wx.navigateTo({
            url: '/pages/buyer-reading/buyer-reading'
        });
    },
    toCommonProblem: function() {
        wx.navigateTo({
            url: '/pages/common-problem/common-problem'
        });
    }
});
