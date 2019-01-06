Component({
    properties: {
        title: {
            type: String,
            value: true,
        },
        background: {
            type: String,
            value: '#333'
        }
    },
    data: {
    },
    methods: {
        click:function(){
            let options = {};
            this.triggerEvent('click', options );
        },
    }
});