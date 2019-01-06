Component({
    properties: {
        datas: {
            type: Array,
            value: [],
        },
        activeIndex: {
            type: Number,
            value: 0,
            observer: function(newVal){
                let index = newVal;
                let tabWidth = this.properties.tabWidth;
                let sliderOffset = ( index * tabWidth );
                this.setData({ sliderOffset });
            }
        },
        tabWidth:{
            type: Number,
            value: 120,
        }
    },
    data: {
        sliderOffset: ''
    },
    ready: function(){
        let index = this.properties.activeIndex;
        let tabWidth = this.properties.tabWidth;
        let sliderOffset = ( index * tabWidth );
        this.setData({ sliderOffset });
    },
    methods: {
        tabClick: function(e) {
            this.setData({
                sliderOffset: e.currentTarget.offsetLeft,
                activeIndex: e.currentTarget.dataset.index
            });
            let options = {
                index: e.currentTarget.dataset.index
            };
            this.triggerEvent('tabClickEvent', options );
        },
    }
});
