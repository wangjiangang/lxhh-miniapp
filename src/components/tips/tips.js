Component({
    properties: {

        // 这里定义了innerText属性，属性值可以在组件使用时指定
        test_prop: {
            type: String,
            value: '',
            observer: function(){

            }
        }
    },
    data: {
        title: '',
    },
    timeEvent:null,
    methods: {

        // 这里是一个自定义方法
        show: function(type='success', title, duration = 2000){
            clearTimeout(this.times);
            this.setData({ type, title });
            this.times = setTimeout(()=> this._hide(), duration);
        },
        _hide:function(){
            let title = '';
            this.setData({title});
        }
    }
});
