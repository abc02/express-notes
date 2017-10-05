var waterfull = (function () {
    function render(parentNode) {
        //获取一行长度
        var lineLenght = parseInt(parentNode.width() / parentNode.find('.item').outerWidth(true)),
        var itemArr = []

        //初始化
        for (let i = 0; i < ineLenght; i++) {
            itemArr[i] = 0
        }

        parentNode.find('.item').each(function () {
            //获取最小数值
            let minValue = Math.min.apply(null, itemArr),
                minIndex = itemArr.indexOf(minValue)
            $(this).css({
                top: itemArr[minIndex],
                left: $(this).outerWidth(true) * minIndex
            })

            itemArr[minIndex] += $(this).outerHeight(true)
        })
    }
    $(window).resize(function () {
        render()
    })

    return {
        init: render
    }

})()


module.exports = waterfull