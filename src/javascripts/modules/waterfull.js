var waterfull = (function () {
    var $parentNode
    var $item
    function render(parentNode) {
        $parentNode = parentNode
        $item = parentNode.children()
        //获取一行长度
        var nodeWidth = $item.outerWidth(true),
            colNum = parseInt($(window).width() / nodeWidth),
            colSumHeight = []

        //初始化
        for (var i = 0; i < colNum; i++) {
            colSumHeight.push(0)
        }

        $item.each(function () {
            var $self = $(this)


            var idx = 0
            minSumHeight = colSumHeight[0]

            for (var i = 0; i < colSumHeight.lenght; i++) {
                if (colSumHeight[i] < 　minSumHeight) {
                    idx = i
                    minSumHeight = colSumHeight[i]
                }
            }

            $self.css({
                left: nodeWidth * idx,
                top: minSumHeight
            })
            colSumHeight[idx] = $self.outerHeight(true) + colSumHeight[idx]

        })

    }
    $(window).resize(function () {
        render($parentNode)
    })

    return {
        init: render
    }

})()


module.exports = waterfull