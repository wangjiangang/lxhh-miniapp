Component({
    properties: {
        isShow: {
            type: Boolean,
            value: true
        },
        scrollTop: {
            type: Number,
            value: 0,
            observer: '_scrollTopObserver'
        }
    },
    data: {
        windowHeight: 0,
        showBackToTopBtn: false
    },
    methods: {
        _scrollTopObserver: function(newVal) {
            this.setData({
                showBackToTopBtn: newVal > this.data.windowHeight
            });
        },
        getSystemInfo: function() {
            wx.getSystemInfo({
                success: ({windowHeight}) => {
                    this.setData({
                        windowHeight
                    });
                }
            });
        },
        backToTopHandler: function() {
            this.setData({
                showBackToTopBtn: false
            });
            wx.pageScrollTo({
                scrollTop: 0
            });
        }
    },
    ready: function() {
        this.getSystemInfo();
    }
});
