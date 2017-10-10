require('scss/index.css')

var NoteEnter = require('modules/note-enter.js')
var Event = require('modules/event.js')
var Waterfull = require('modules/waterfull.js')
var Toast = require('modules/toast.js')

var NOTES_COVER_DOM = $('#notes-cover')
var ADD_NOTE_DOM = $('.add-note')
NoteEnter.load()


Event.on('waterfull',function(message){
    Waterfull.init(NOTES_COVER_DOM)
})
Event.on('toast',function(message){
    Toast.init(message)
})

ADD_NOTE_DOM.on('click',function(){
    console.log(ADD_NOTE_DOM.attr('data-uid'))
    NoteEnter.add({
        updatedAt: (new Date).toISOString().split('T')[0],
        user:{
            uid:ADD_NOTE_DOM.attr('data-uid'),
            username:ADD_NOTE_DOM.attr('data-username')
        }
    })
    Event.trigger('waterfull')
})


