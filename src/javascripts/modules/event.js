var eventCenter = (function () {
    var pools = {}
    var on = function (topic, fn) {
        if (pools[topic]) {
            pools[topic].push(fn)
        } else {
            pools[topic] = [fn]
        }
    }
    var trigger = function (topic,message) {
        if (pools[topic]) {
            pools[topic].forEach((fn) => {
                fn(message)
            })
        }
    }
    return {
        on: on,
        trigger: trigger
    }
})()

module.exports = eventCenter