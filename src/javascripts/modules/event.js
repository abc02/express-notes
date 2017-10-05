var eventCenter = (function () {
    var pools = {}
    var on = function (topic, fn) {
        if (pools[topic]) {
            pools[topic].push(fn)
        } else {
            pools[topic] = [fn]
        }
    }
    var trigger = function (topic) {
        if (pools[topic]) {
            pools[topic].forEach((fn) => {
                fn()
            })
        }
    }
    return {
        on: on,
        trigger: trigger
    }
})()

module.exports = eventCenter