require('scss/toast.scss')


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

function Toast(message, time){
    return new toast(message, time)
}

module.exports.Toast = Toast