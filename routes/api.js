var express = require('express');
var router = express.Router();
var PATH = require('path')
var Notes = require(PATH.join(__dirname, '../model/notes.js'))

/*
request   {} 
response  {status:0, message:'ok', result:[{note}, {note}...] } 成功
          {status:1, errorMessage:'error’} 失败
1.获取所有notes  GET    /api/notes
2.创建一个 note  POST   /api/note/create    {note: 'string'}
3.修改一个note   POST   /api/note/modify    {note: 'stirng', id: noteid}
4.删除一个note   POST   /api/note/deleted   {id: noteid}
*/
var SUCCESS_GLOBAL = {
  status: 0,
  message: 'ok',
}
var ERROR_GLOBAL = {
  status: 1,
  errorMessage: 'errorMessage'
}

/* GET users listing. */
router.get('/notes', function (req, res, next) {
  var SUCCESS_LOCAL = Object.assign({}, SUCCESS_GLOBAL)
  console.log('notes .....')
  Notes.findAll({raw:true}).then(notes => {
    SUCCESS_LOCAL.result = notes
    res.send(SUCCESS_LOCAL)
  }).catch(error => {
    ERROR_GLOBAL.errorMessage = error
    res.send(ERROR_GLOBAL)
  });

});

router.post('/note/create', function (req, res) {
  var SUCCESS_LOCAL = Object.assign({}, SUCCESS_GLOBAL)
  var note = req.body
  console.log('note/create .....')
  Notes.create(note).then(curNote => {
    SUCCESS_LOCAL.note = curNote.dataValues
    res.send(SUCCESS_LOCAL)
  }).catch(error => {
    ERROR_GLOBAL.errorMessage = error
    res.send(ERROR_GLOBAL)
  });
})

router.post('/note/modify', function (req, res) {
  var SUCCESS_LOCAL = Object.assign({}, SUCCESS_GLOBAL)
  var note = req.body
  console.log('note/modify .....')
  Notes.findById(note.id).then(prevNote => {
    prevNote.update({ text: note.text }).then(curNote => {
      SUCCESS_LOCAL.note = curNote.dataValues
      res.send(SUCCESS_LOCAL)
    })

  }).catch(error => {
    ERROR_GLOBAL.errorMessage = error
    res.send(ERROR_GLOBAL)
  })
})

router.post('/note/deleted', function (req, res) {
  var SUCCESS_LOCAL = Object.assign({}, SUCCESS_GLOBAL)
  var note = req.body
  console.log('/note/deleted .....')
  Notes.findById(note.id).then(curNote => {
    curNote.update({ deleted: true }).then(curNote => {
      SUCCESS_LOCAL.note = curNote.dataValues
      res.send(SUCCESS_LOCAL)
    })
  }).catch(error => {
    ERROR_GLOBAL.errorMessage = error
    res.send(ERROR_GLOBAL)
  })
})

module.exports = router;
