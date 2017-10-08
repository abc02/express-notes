var express = require('express');
var router = express.Router();
var PATH = require('path')
var Notes = require(PATH.join(__dirname, '../model/notes.js'))

/*
request   {} 
response  
  { 
    status:0, 表示成功
    message:'ok',
    result:[{note}, {note}...] 
  } 
  { 
    status:1, 表示服务端错误
    error:'error’
  } 
  {
    status: 2, //表示客户端错误
    message:'info'
  }
1.获取所有notes  GET    /api/notes
2.创建一个 note  POST   /api/note/create    {note: 'string'}
3.修改一个note   POST   /api/note/modify    {note: 'stirng', id: noteid}
4.删除一个note   POST   /api/note/deleted   {id: noteid}
*/


/* GET users listing. */
router.get('/notes', function (req, res, next) {
  var findOption = { raw:true }
  if(req.session && req.session.user){
    findOption.where = {
      uid: req.session.user.id
    }
  }
  console.log('notes .....')
  Notes.findAll(findOption).then(notes => {
    res.send({
      status:0,
      message:'ok',
      result:notes
    })
  }).catch(error => {
    res.send({
      status: 1,
      error: error
    })
  });

});

router.post('/note/create', function (req, res) {
  if (!req.session || !req.session.user) {
    return res.send({
      status: 2,
      error:'请先登录'
    })
  }
  var note = req.body.text
  var uid  = req.session.user.id
  console.log('note/create .....')
  //console.log(req)
  Notes.create({uid:uid,text:note}).then(note => {
    //SUCCESS_LOCAL.note = curNote.dataValues
    console.log(note.get({
      plain:true
    }))
    res.send({
      status:0,
      note: note.get({ plain:true })
    })
  }).catch(error => {
    res.send({
      status: 1,
      error: error
    })
  });
})

router.post('/note/modify', function (req, res) {
  if (!req.session || !req.session.user) {
    return res.send({
      status: 2,
      error:'请先登录'
    })
  }
  var note = req.body
  console.log('note/modify .....')
  Notes.findById(note.id).then(prevNote => {
    prevNote.update({ text: note.text }).then(curNote => {
      //SUCCESS_LOCAL.note = curNote.dataValues
      res.send({
        status:0
      })
    })

  }).catch(error => {
    res.send({
      status: 1,
      error: error
    })
  })
})

router.post('/note/deleted', function (req, res) {
  if (!req.session || !req.session.user) {
    return res.send({
      status: 2,
      error:'请先登录'
    })
  }
  var note = req.body
  console.log('/note/deleted .....')
  Notes.findById(note.id).then(curNote => {
    curNote.update({ deleted: true }).then(curNote => {
      //SUCCESS_LOCAL.note = curNote.dataValues
      res.send({
        status:0,
      })
    })
  }).catch(error => {
    res.send({
      status: 1,
      error: error
    })
  })
})

module.exports = router;
