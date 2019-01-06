import {goods} from '../../api/goods';
Page({
    data: {
        goodsList: goods
    },
    toGoodsDetail: function(event) {
        wx.navigateTo({
            url: `/pages/goods-detail/goods-detail?goodsId=${event.currentTarget.dataset.id}`
        });
    }
});
