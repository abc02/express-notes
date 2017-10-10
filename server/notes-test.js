var PATH = require('path')
var {Notes,Users} = require(PATH.join(__dirname, '../model/notes.js'))


function getByUser(note){
    console.log('getByUser ...')
    console.log(note)
      return new Promise((resolve, reject) => {
        Users.findOne({ where: {uid: note.uid } }).then(user =>{
          console.log('user findone' ,user.get({ plain: true }))
          resolve(user.get({ plain: true }))
        }).catch(error =>{
          reject(error)
        })
    })
    
  }
  
  async function getNewResult(notes) {
    let preUid, userInfo
    console.log('getNewResult ...')
    for (let i = 0; notes.length; i++) {
      console.log('for ', notes[i].uid)
      if(preUid === notes[i].uid){
        notes[i].user = userInfo
      }else{
        userInfo = await getByUser(notes[i])
        notes[i].user = userInfo
      }
      preUid = notes[i].uid
      
    }
    console.log('getNewResult end ... ', notes)
    return notes
  }

  
  var findOption = { raw:true }


  console.log('notes .....')
  Notes.findAll(findOption).then(notes => {
    console.log('notefindAll  ...')
    var newResult = getNewResult(notes)
    console.log(newResult)

  }).catch(error => {
    res.send({
      status: 1,
      error: error
    })
  });
