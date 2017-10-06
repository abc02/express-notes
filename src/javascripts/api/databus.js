var DataBus = (function () {
    function get(url, data, successFn, errorFn) {
        $.get(url).done(function(res){
            successFn(res) && successFn.call(null, res)
        }).fail(function(error){
            errorFn(error) && errorFn.call(null,error)
        })
    }
    function post(url, data, successFn, errorFn) {
        $.post(url, data).done(function(res){
            successFn(res) && successFn.call(null, res)
        }).fail(function(error){
            errorFn(error) && errorFn.call(null,error)
        })
    }
    return {
        get: get,
        post, post
    }
})()


module.exports = DataBus