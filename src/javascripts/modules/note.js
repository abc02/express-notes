require('scss/note.css')




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
            'panel-default',
            'panel-primary',
            'panel-success',
            'panel-info',
            'panel-warning',
            'panel-danger',
            'panel-primary',
            'panel-success',
            'panel-info',
            'panel-warning',

        ],

        defaultOptions: {
            id: '',
            $container: $('#notes-cover').length > 0 ? $('#notes-cover') : $('body'),
            text: '新建便签',
            deleted: false
        },

        init: function (options) {
            this.options = $.extend({}, this.defaultOptions, options || {})
        },

        createNote: function () {

        var panel = '<div class="panel">'
                 + '<div class="panel-heading">'
                 + '<h3 class="panel-title">panel title</h3>'
                 + '</div>'
                 + '<div class="panel-body" contenteditable="true">新建便签</div>'
                 + '<div class="panel-footer">Panel footer</div></div>'

            var tpl = '<div class="note-item">'
                + '<div class="note-head"><span class="delete">&times;</span></div>'
                + '<div class="note-body" contenteditable="true"></div>'
                + '</div>'
            this.$note = $(panel)

            if(this.options.user.uid){
                this.$note.find('.panel-title').text(this.options.user.username)
                this.$note.find('.panel-body').html(this.options.text)
                this.$note.find('.panel-footer').text(this.options.updatedAt.split(' ')[0])
            }
          
            if (!this.options.deleted) {
                this.options.$container.append(this.$note)
            }
            if (!this.options.id) {
                this.$note.siblings().css('zIndex', 0);
                this.$note.css({zIndex: 999, left: '10px', top: '100px'});
            }
        },

        setStyle: function () {
            var color = this.colors[Math.floor(Math.random() * 10)]
            this.$note.addClass(color)
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
                $noteHead = this.$note.find('.panel-heading'),
                $noteBody = this.$note.find('.panel-body'),
                $delete = this.$note.find('.delete')

            $delete.on('click', function () {
                self.delete()
            })

            $noteBody.on('focus', function () {
                if ($noteBody.html() === '新建便签') {
                        $noteBody.html('')
                } 
                $noteBody.data('before', $noteBody.html())
            }).on('blur paste', function () {
                if ($noteBody.data('before') != $noteBody.html()) {
                    $noteBody.data('before', $noteBody.html())
                    self.setLayout()
                    if (self.options.id) {
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
            var errorFn = (res) =>{

            }
            DataBus.post(
                NOTE_API.modify,
                { id: this.options.id, text: message },
                successsFn,
                this.errorFn.bind(this, '编辑失败，请重新尝试')
            )
        },

        add: function (message) {
            console.log('add   ..', message)
            var successsFn = (res) =>{
                if(res.status === 0){
                    console.log(res.note)
                    this.options = res.note
                    Event.trigger('toast', '新增成功')
                    Event.trigger('waterfull')
                }else{
                    this.$note.remove()
                    Event.trigger('toast', res.error)
                }
            }
            var errorFn = (res) => {
                
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
            var successsFn = (res) => {
                if(res.status === 0){
                    this.$note.remove()
                    Event.trigger('toast', '删除成功')
                    Event.trigger('waterfull')
                }else{
                    Event.trigger('toast', res.error)
                }
            }
            var errorFn = (res) => {
                
            }
            DataBus.post(
                NOTE_API.deleted,
                { id: this.options.id },
                successsFn,
                this.errorFn.bind(this, '删除失败，请重新尝试')
            )
        },

        // successsFn(message, res) {
        //     if (!this.options.id) {
        //         this.options.id = res.note.id
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