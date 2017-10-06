var waterfull = (function () {
    var $parentNode
    var $item
    function render(parentNode) {
        if (parentNode === 'undefined') return
        $parentNode = parentNode
        $item = parentNode.children()




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

            for (var i = 0; i < colSumHeight.length; i++) {
                if (colSumHeight[i] < minSumHeight) {
                    //console.log(i)
                    idx = i
                    minSumHeight = colSumHeight[i]
                }
            }
            //console.log('idx' , idx)
            $self.css({
                left: nodeWidth * idx,
                top: minSumHeight
            })
            colSumHeight[idx] += $self.outerHeight(true)

        })

    }

    function render2(parentNode) {
        if (parentNode === 'undefined') return
        $parentNode = parentNode
        $item = parentNode.children()

        var nodeWidth = $item.outerWidth(true),
            colNum = parseInt($(window).width() / nodeWidth),
            colSumHeight = []
           // console.log(colSumHeight)
        for (var i = 0; i < colNum; i++) {
            colSumHeight.push(0)
        }

        $item.each(function () {
            //获取最小数值
            let minValue = Math.min.apply(null, colSumHeight),
                minIndex = colSumHeight.indexOf(minValue)
            $(this).css({
                top: colSumHeight[minIndex],
                left: nodeWidth * minIndex
            })

            colSumHeight[minIndex] += $(this).outerHeight(true)
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