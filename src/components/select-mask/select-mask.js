Component({
    properties: {
        datas: {
            type: Array,
            value: [],
        },
        active: {
            type: Boolean,
            value: false
        }
    },
    data: {
    },
    methods: {
        toggleMask:function(){
            let active = !this.data.active;
            let options = { active };
            this.triggerEvent('closeMaskEvent', options );
        },
    }
});
