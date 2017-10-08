require('scss/note.scss')

var Event = require('modules/event.js')
var DataBus = require('api/databus.js')
var NOTE_API = require('api/note-api.js')



var note = (function () {


    function Note(options) {
        this.init(options)
        this.createNote()
        this.setStyle()
        this.bindEvent()
    }

    Note.prototype = {

        colors: [
            ['#ea9b35', '#efb04e'],
            ['#dd596b', '#e672a2']
        ],

        defaultOptions: {
            id: '',
            $container: $('#notes-container').length > 0 ? $('#notes-container') : $('body'),
            context: 'input here',
            deleted: false
        },

        init: function (options) {
            this.options = $.extend({}, this.defaultOptions, options || {})
            if (this.options.id) {
                this.id = this.options.id
            }
            this.deleted = this.options.deleted
        },

        createNote: function () {
            var tpl = '<div class="note-item">'
                + '<div class="note-head"><span class="delete">&times;</span></div>'
                + '<div class="note-body" contenteditable="true"></div>'
                + '</div>'
            this.$note = $(tpl)
            this.$note.find('.note-body').html(this.options.context)
            if (!this.deleted) {
                this.options.$container.append(this.$note)
            }
            if (!this.id) {
                this.$note.siblings().css('zIndex', 0);
                this.$note.css({zIndex: 999, left: '10px', top: '100px'});
            }
            //if (!this.id) this.$note.css('buttom', '10px')
        },

        setStyle: function () {
            //var color = this.colors[Math.floor(Math.random() * 2)]
            //console.log('setStyle cover')
        },

        setLayout() {
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(function () {
                Event.trigger('waterfull')
            }, 100)
        },

        bindEvent: function () {
            var self = this,
                $note = this.$note,
                $noteHead = this.$note.find('.note-head'),
                $noteBody = this.$note.find('.note-body'),
                $delete = this.$note.find('.delete')

            $delete.on('click', function () {
                self.delete()
            })

            $noteBody.on('focus', function () {
                if ($noteBody.html() === 'input here') {
                        $noteBody.html('')
                } 
                $noteBody.data('before', $noteBody.html())
            }).on('blur paste', function () {
                if ($noteBody.data('before') != $noteBody.html()) {
                    $noteBody.data('before', $noteBody.html())
                    self.setLayout()
                    if (self.id) {
                        self.edit($noteBody.html())
                    } else {
                        self.add($noteBody.html())
                    }
                }
            })

            $noteHead.on('mousedown', function (e) {
                console.log('mousedown')
                var eventX = e.pageX - $note.offset().left,
                    eventY = e.pageY - $note.offset().top;
                $note.addClass('draggable')
                    .css('zIndex', 999)
                    .siblings()
                    .css('zIndex', 0)
                $('body').on('mousemove', function (e) {
                    console.log('mousemove')
                    e.preventDefault()
                    $('.draggable').length && $('.draggable').offset({
                        top: e.pageY - eventY,
                        left: e.pageX - eventX
                    });
                });
            }).on('mouseup', function () {
                console.log('mouseup')
                $note.removeClass('draggable')
                $('body').off('mousemove')
            })

            // var span = $noteHead.get(0);
            // console.log(span)
            // span.onmousedown = function (event) {
            //     console.log('onmousedown')
            //     var event = event || window.event;
            //     var chaX = event.clientX - span.offsetLeft;
            //     var chaY = event.clientY - span.offsetTop;
            //     console.log(event, chaX, chaY)
            //     document.onmousemove = function (event) {
            //         console.log('onmousemove')
            //         var event = event || window.event;
            //         $note.get(0).style.left = event.clientX - chaX + 'px';
            //         $note.get(0).style.top = event.clientY - chaY + 'px';
            //     }
            //     document.onmouseup = function () {
            //         document.onmousemove = null;
            //     }
            // }
             // note move ==> mouse down
            // note fixed ==> mouse up
            // $noteHead.on('mousedown', function (e) {
            //     let evtX = e.pageX - $note.offset().left,
            //         evtY = e.pageY - $note.offset().top;
            //     $note.addClass('draggable').data('evtPos', {x: evtX, y: evtY});
            // }).on('mouseup', function () {
            //     $note.removeClass('draggable').removeData('evtPos');
            // });

            // // set position ==> mouse move
            // $('body').on('mousemove', function (e) {
            //     $('.draggable').length && $('.draggable').offset({
            //         top: e.pageY - $('.draggable').data('evtPos').y,
            //         left: e.pageX - $('.draggable').data('evtPos').x
            //     });
            // });

            // //note的拖拽效果
            // $noteHead.on('mousedown', function (e) {
            //     var eventX = e.pageX - $note.offset().left,
            //         eventY = e.pageY - $note.offset().top;
            //     $note.addClass('draggable')
            //         .css('zIndex', 999)
            //         .siblings()
            //         .css('zIndex', 0);
            //     $('body').on('mousemove', function (e) {
            //         e.preventDefault();
            //         $('.draggable').length && $('.draggable').offset({
            //             top: e.pageY - eventY,
            //             left: e.pageX - eventX
            //         });
            //     });
            // }).on('mouseup', function () {
            //     $note.removeClass('draggable');
            // });



            /*
            //设置笔记的移动
            $noteHead.on('mousedown', function (e) {
                var evtX = e.pageX - $note.offset().left,   //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
                    evtY = e.pageY - $note.offset().top;
                $note.addClass('draggable').data('evtPos', { x: evtX, y: evtY }); //把事件到 dialog 边缘的距离保存下来
                console.log('mousedown')
            }).on('mouseup', function () {
                $note.removeClass('draggable').removeData('pos');
                console.log('mouseup')
            });
    
            $('body').on('mousemove', function (e) {
                $('.draggable').length && $('.draggable').offset({
                    top: e.pageY - $('.draggable').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
                    left: e.pageX - $('.draggable').data('evtPos').x
                });
            });
    
            */
        },

        edit: function (message) {
            console.log('edit   ..', message)
            var successsFn = function(res){
                if(res.status === 0){

                    Event.trigger('toast', '编辑成功')
                    Event.trigger('waterfull')
                }else{
                    Event.trigger('toast', res.error)
                }
            }
            var errorFn = function(res){

            }
            DataBus.post(
                NOTE_API.modify,
                { id: this.id, text: message },
                successsFn,
                this.errorFn.bind(this, '编辑失败，请重新尝试')
            )
        },

        add: function (message) {
            console.log('add   ..', message)
            var successsFn = function(res){
                if(res.status === 0){
                    Event.trigger('toast', '新增成功')
                    Event.trigger('waterfull')
                }else{
                    Event.trigger('toast', res.error)
                }
            }
            var errorFn = function(res){
                
            }
            DataBus.post(
                NOTE_API.create,
                { text: message },
                successsFn,
                this.errorFn.bind(this, '新增失败，请重新尝试')
            )
        },

        delete: function (e) {
            console.log('delete   ..')
            var successsFn = function(res){
                if(res.status === 0){
                    this.$note.remove()
                    Event.trigger('toast', '删除成功')
                    Event.trigger('waterfull')
                }else{
                    Event.trigger('toast', res.error)
                }
            }
            var errorFn = function(res){
                
            }
            DataBus.post(
                NOTE_API.deleted,
                { id: this.id },
                successsFn,
                this.errorFn.bind(this, '删除失败，请重新尝试')
            )
        },

        // successsFn(message, res) {
        //     if (!this.id) {
        //         this.id = res.note.id
        //         this.options.id = res.note.id
        //     }
        //     if (res.note.deleted) {
        //         this.$note.remove()
        //     }
           
        // },
        errorFn(message, res) {
            Event.trigger('toast', message)
        }
    }

    function init(options) {
        new Note(options)
    }

    return {
        init: init
    }

})()

module.exports = note