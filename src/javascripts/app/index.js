require('scss/index.scss')

var NoteEnter = require('modules/note-enter.js')
var Event = require('modules/event.js')
var Waterfull = require('modules/waterfull.js')
var Toast = require('modules/toast.js')

var NOTES_COVER_DOM = $('#notes-cover')

NoteEnter.load()


Event.on('waterfull',function(message){
    Waterfull.init(NOTES_COVER_DOM)
})
Event.on('toast',function(message){
    Toast.init(message)
})

$('.add-note').on('click',function(){
    NoteEnter.add()
    Event.trigger('waterfull')
})


