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
            if(!this.deleted) {
                this.options.$container.append(this.$note)
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
                if ($noteBody.html() === 'input here') $noteBody.html('')
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
                // bug is = -> -
                var eventX = e.pageX - $note.offset().left,
                    eventY = e.pageY - $note.offset().top;
                //console.log('mousedown', eventX, e.pageX, $note.offset().left)
                $note.addClass('draggable').data('eventposition', { x: eventX, y: eventY });
                console.log('mousedown', $note.data('eventposition'))
            }).on('mouseup', function () {
                $note.removeClass('draggable').removeData('eventposition');
                console.log('mouseup')
            })

            $('body').on('mousemove', function (e) {
                //console.log($('.draggable').length)
                $('.draggable').length && $('.draggable').offset({
                    top: e.pageY - $('.draggable').data('eventposition').y,
                    left: e.pageX - $('.draggable').data('eventposition').x
                });
            });

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
            DataBus.post(
                NOTE_API.modify, 
                { id:this.id, text: message },
                this.successsFn.bind(this, '编辑成功'), 
                this.errorFn.bind(this, '编辑失败，请重新尝试')
            )
        },

        add: function (message) {
            console.log('add   ..', message)
            DataBus.post(
                NOTE_API.create, 
                { text: message }, 
                this.successsFn.bind(this, '新增成功'), 
                this.errorFn.bind(this, '新增失败，请重新尝试')
            )
        },

        delete: function (e) {
            console.log('delete   ..')
            DataBus.post(
                NOTE_API.deleted,
                { id:this.id, deleted: true },
                this.successsFn.bind(this, '删除成功'), 
                this.errorFn.bind(this, '删除失败，请重新尝试')
            )
        },

        successsFn(message, res) {
            if(!this.id){
                this.id = res.note.id
                this.options.id = res.note.id
            }
            if(res.note.deleted){
                this.$note.remove()
            }
            Event.trigger('toast', message)
            Event.trigger('waterfull')
        },
        errorFn(message, res) {
            Event.trigger('toast', message)
        }
    }

    function init(options) {
        return new Note(options)
    }

    return {
        init: init
    }

})()

module.exports = note