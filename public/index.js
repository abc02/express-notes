/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var eventCenter = function () {
    var pools = {};
    var on = function (topic, fn) {
        if (pools[topic]) {
            pools[topic].push(fn);
        } else {
            pools[topic] = [fn];
        }
    };
    var trigger = function (topic, data) {
        if (pools[topic]) {
            pools[topic].forEach(fn => {
                fn(data);
            });
        }
    };
    return {
        on: on,
        trigger: trigger
    };
}();

module.exports = eventCenter;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var DataBus = function () {
    function get(url, data, successFn, errorFn) {
        $.get(url).done(function (res) {
            successFn(res) && successFn.call(null, res);
        }).fail(function (error) {
            errorFn(error) && errorFn.call(null, error);
        });
    }
    function post(url, data, successFn, errorFn) {
        $.post(url, data).done(function (res) {
            successFn(res) && successFn.call(null, res);
        }).fail(function (error) {
            errorFn(error) && errorFn.call(null, error);
        });
    }
    return {
        get: get,
        post, post
    };
}();

module.exports = DataBus;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
request   {} 
response  {status:0, message:'ok', result:[{note}, {note}...] } 成功
          {status:1, errorMessage:'error’} 失败
1.获取所有notes  GET    /api/notes
2.创建一个 note  POST   /api/note/create    {note: 'string'}
3.修改一个note   POST   /api/note/modify    {note: 'stirng', id: noteid}
4.删除一个note   POST   /api/note/deleted   {id: noteid}
*/

var NOTE_API = function () {
    return {
        notes: 'api/notes',
        create: 'api/note/create',
        modify: 'api/note/modify',
        deleted: 'api/note/deleted'
    };
}();

module.exports = NOTE_API;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);

var NoteEnter = __webpack_require__(6);
var Event = __webpack_require__(0);
var Waterfull = __webpack_require__(9);
var Toast = __webpack_require__(10);

var NOTES_COVER_DOM = $('#notes-cover');

NoteEnter.load();

Event.on('waterfull', function (message) {
    Waterfull.init(NOTES_COVER_DOM);
});
Event.on('toast', function (message) {
    Toast.init(message);
});

$('.add-note').on('click', function () {
    NoteEnter.add();
    Event.trigger('waterfull');
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Note = __webpack_require__(7);
var Event = __webpack_require__(0);
var DataBus = __webpack_require__(1);
var NOTE_API = __webpack_require__(2);

var NoteEnter = function () {
    function notesLoad(notes) {
        console.log(notes);
        $.each(notes, function (index, note) {
            if (note.deleted) return;
            Note.init(note);
        });
        Event.trigger('waterfull');
    }

    function load() {
        DataBus.get(NOTE_API.notes, {}, function (res) {
            notesLoad(res.result);
            Event.trigger('toast', '载入完毕');
        }, function (error) {
            Event.trigger('toast', error.statusText);
        });
    }

    function add() {
        Note.init();
    }

    return {
        load: load,
        add: add
    };
}();

module.exports = NoteEnter;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);

var Event = __webpack_require__(0);
var DataBus = __webpack_require__(1);
var NOTE_API = __webpack_require__(2);

var note = function () {

    function Note(options) {
        this.init(options);
        this.createNote();
        this.setStyle();
        this.bindEvent();
    }

    Note.prototype = {

        colors: ['panel-default', 'panel-primary', 'panel-success', 'panel-info', 'panel-warning', 'panel-danger', 'panel-primary', 'panel-success', 'panel-info', 'panel-warning'],

        defaultOptions: {
            id: '',
            $container: $('#notes-cover').length > 0 ? $('#notes-cover') : $('body'),
            context: 'input here',
            deleted: false
        },

        init: function (options) {
            this.options = $.extend({}, this.defaultOptions, options || {});
            if (this.options.id) {
                this.id = this.options.id;
            }
            this.deleted = this.options.deleted;
        },

        createNote: function () {

            var panel = '<div class="panel">' + '<div class="panel-heading">' + '<h3 class="panel-title">xx说</h3>' + '<span class="delete">&times;</span></div>' + '<div class="panel-body" contenteditable="true"></div>' + '<div class="panel-footer">Panel footer</div></div>';

            var tpl = '<div class="note-item">' + '<div class="note-head"><span class="delete">&times;</span></div>' + '<div class="note-body" contenteditable="true"></div>' + '</div>';
            this.$note = $(panel);
            this.$note.find('.panel-body').html(this.options.text);
            if (!this.deleted) {
                this.options.$container.append(this.$note);
            }
            if (!this.id) {
                this.$note.siblings().css('zIndex', 0);
                this.$note.css({ zIndex: 999, left: '10px', top: '100px' });
            }
            //if (!this.id) this.$note.css('buttom', '10px')
        },

        setStyle: function () {
            console.log(Math.floor(Math.random() * 10));
            var color = this.colors[Math.floor(Math.random() * 10)];
            this.$note.addClass(color);
        },

        setLayout() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(function () {
                Event.trigger('waterfull');
            }, 100);
        },

        bindEvent: function () {
            var self = this,
                $note = this.$note,
                $noteHead = this.$note.find('.panel-heading'),
                $noteBody = this.$note.find('.panel-body'),
                $delete = this.$note.find('.delete');

            $delete.on('click', function () {
                self.delete();
            });

            $noteBody.on('focus', function () {
                if ($noteBody.html() === 'input here') {
                    $noteBody.html('');
                }
                $noteBody.data('before', $noteBody.html());
            }).on('blur paste', function () {
                if ($noteBody.data('before') != $noteBody.html()) {
                    $noteBody.data('before', $noteBody.html());
                    self.setLayout();
                    if (self.id) {
                        self.edit($noteBody.html());
                    } else {
                        self.add($noteBody.html());
                    }
                }
            });

            $noteHead.on('mousedown', function (e) {
                console.log('mousedown');
                var eventX = e.pageX - $note.offset().left,
                    eventY = e.pageY - $note.offset().top;
                $note.addClass('draggable').css('zIndex', 999).siblings().css('zIndex', 0);
                $('body').on('mousemove', function (e) {
                    console.log('mousemove');
                    e.preventDefault();
                    $('.draggable').length && $('.draggable').offset({
                        top: e.pageY - eventY,
                        left: e.pageX - eventX
                    });
                });
            }).on('mouseup', function () {
                console.log('mouseup');
                $note.removeClass('draggable');
                $('body').off('mousemove');
            });
        },

        edit: function (message) {
            console.log('edit   ..', message);
            var successsFn = function (res) {
                if (res.status === 0) {

                    Event.trigger('toast', '编辑成功');
                    Event.trigger('waterfull');
                } else {
                    Event.trigger('toast', res.error);
                }
            };
            var errorFn = res => {};
            DataBus.post(NOTE_API.modify, { id: this.id, text: message }, successsFn, this.errorFn.bind(this, '编辑失败，请重新尝试'));
        },

        add: function (message) {
            console.log('add   ..', message);
            var successsFn = res => {
                if (res.status === 0) {
                    this.id = res.note.id;
                    Event.trigger('toast', '新增成功');
                    Event.trigger('waterfull');
                } else {
                    this.$note.remove();
                    Event.trigger('toast', res.error);
                }
            };
            var errorFn = res => {};
            DataBus.post(NOTE_API.create, { text: message }, successsFn, this.errorFn.bind(this, '新增失败，请重新尝试'));
        },

        delete: function (e) {
            console.log('delete   ..');
            var successsFn = res => {
                if (res.status === 0) {
                    this.$note.remove();
                    Event.trigger('toast', '删除成功');
                    Event.trigger('waterfull');
                } else {
                    Event.trigger('toast', res.error);
                }
            };
            var errorFn = res => {};
            DataBus.post(NOTE_API.deleted, { id: this.id }, successsFn, this.errorFn.bind(this, '删除失败，请重新尝试'));
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
            Event.trigger('toast', message);
        }
    };

    function init(options) {
        new Note(options);
    }

    return {
        init: init
    };
}();

module.exports = note;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var waterfull = function () {
    var $parentNode;
    var $item;
    var maxHeight;
    function render(parentNode) {
        if (parentNode === 'undefined') return;
        $parentNode = parentNode;
        $item = parentNode.children();

        var nodeWidth = $item.outerWidth(true),
            colNum = parseInt($(window).width() / nodeWidth),
            colSumHeight = [];

        //初始化
        for (var i = 0; i < colNum; i++) {
            colSumHeight.push(0);
        }

        $item.each(function () {
            var $self = $(this);

            var idx = 0;
            minSumHeight = colSumHeight[0];

            for (var i = 0; i < colSumHeight.length; i++) {
                if (colSumHeight[i] < minSumHeight) {
                    //console.log(i)
                    idx = i;
                    minSumHeight = colSumHeight[i];
                }
            }
            //console.log('idx' , idx)
            $self.css({
                left: nodeWidth * idx,
                top: minSumHeight
            });
            colSumHeight[idx] += $self.outerHeight(true);
            maxHeight = colSumHeight[idx];
        });
        $('#notes-cover').height(maxHeight);
    }

    function render2(parentNode) {
        if (parentNode === 'undefined') return;
        $parentNode = parentNode;
        $item = parentNode.children();

        var nodeWidth = $item.outerWidth(true),
            colNum = parseInt($(window).width() / nodeWidth),
            colSumHeight = [];
        // console.log(colSumHeight)
        for (var i = 0; i < colNum; i++) {
            colSumHeight.push(0);
        }

        $item.each(function () {
            //获取最小数值
            let minValue = Math.min.apply(null, colSumHeight),
                minIndex = colSumHeight.indexOf(minValue);
            $(this).css({
                top: colSumHeight[minIndex],
                left: nodeWidth * minIndex
            });

            colSumHeight[minIndex] += $(this).outerHeight(true);
        });
    }
    $(window).resize(function () {
        $('#notes-cover').height(maxHeight);
        render($parentNode);
    });

    return {
        init: render
    };
}();

module.exports = waterfull;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
var Toast = function () {
    function toast(message, time) {
        this.message = message;
        this.didTime = time || 1000;
        this.createToast();
        this.bindTimeToast();
    }

    toast.prototype = {
        createToast: function () {
            var tpl = '<div class="toast">' + this.message + '</div>';
            this.$toast = $(tpl);
            $('body').append(this.$toast);
        },
        bindTimeToast: function () {
            var self = this;
            self.$toast.fadeIn(300, function () {
                setTimeout(function () {
                    self.$toast.fadeOut(300, function () {
                        self.$toast.remove();
                    });
                }, self.didTime);
            });
        }
    };

    function init(message, time) {
        return new toast(message, time);
    }
    return {
        init: init
    };
}();

module.exports = Toast;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map