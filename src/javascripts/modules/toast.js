require('scss/toast.scss')
var Toast = (function(){
    function toast(message, time){
        this.message = message
        this.didTime = time || 1000
        this.createToast()
        this.bindTimeToast()
    }
    
    toast.prototype = {
        createToast: function(){
            var tpl = '<div class="toast">' + this.message + '</div>'
            this.$toast = $(tpl)
            $('body').append(this.$toast)
        },
        bindTimeToast: function(){
            var self = this
            self.$toast.fadeIn(300, function(){
                setTimeout(function(){
                    self.$toast.fadeOut(300, function(){
                        self.$toast.remove()
                    })
                }, self.didTime)
            })
        }
    }

    function init(message, time){
        return new toast(message, time)
    }
    return {
        init :init
    }

})()




module.exports = Toast