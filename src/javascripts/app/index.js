require('scss/index.scss')
var NoteEnter = require('modules/note-enter.js')
var Event = require('modules/event.js')
var Waterfull = require('modules/waterfull.js')
var Toast = require('modules/toast.js')

var NOTES_CONTAINER_DOM = $('#notes-container')

NoteEnter.load()


Event.on('waterfull',function(message){
    Waterfull.init(NOTES_CONTAINER_DOM)
})
Event.on('toast',function(message){
    Toast.init(message)
})

$('.note-add').on('click',function(){
    NoteEnter.add()
    Event.trigger('waterfull')
})


