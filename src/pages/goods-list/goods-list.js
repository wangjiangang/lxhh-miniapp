import {goods} from '../../api/goods';
import {goodsBaseUrl} from '../../config/config';
Page({
    data: {
        goodsList: goods,
        goodsBaseUrl
    },
    toGoodsDetail: function(event) {
        wx.navigateTo({
            url: `/pages/goods-detail/goods-detail?goodsId=${event.currentTarget.dataset.id}`
        });
    }
});
