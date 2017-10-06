var Note = require('modules/note.js')
var Event = require('modules/event.js')
var DataBus = require('api/databus.js')
var NOTE_API = require('api/note-api.js')



var NoteEnter = (function(){
    function notesLoad(notes){
        $.each(notes, function (index, note) {
            console.log(note)
            if(note.deleted) return 
            Note.init({
                id: note.id,
                context: note.text,
            })
        })
        Event.trigger('waterfull')
    }
    
    function load() {
        DataBus.get(
            NOTE_API.notes,
            {},
            function (res) {
                notesLoad(res.result)
                Event.trigger('toast', '载入完毕')
            },
            function (error) {
                Event.trigger('toast', error.statusText)
            }
        )
    }

    function add (){
        Note.init()
    }

    return {
        load: load,
        add: add,
    }
})()

module.exports = NoteEnter 