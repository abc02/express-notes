var PATH = require('path')
var Sequelize = require('sequelize')
var sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    // SQLite only
    storage: PATH.join(__dirname,'../database/database.sqlite')
  });

  var  Notes = sequelize.define('notes', {
    text: {
      type: Sequelize.STRING
    },
    uid: {
      type: Sequelize.STRING
    },
    deleted:{
      type:Sequelize.BOOLEAN,
      defaultValue:false
    }
  });
var Users =  sequelize.define('users', {
  uid: {
    type: Sequelize.STRING
  },
  provider:{
    type: Sequelize.STRING
  },
  username:{
    type: Sequelize.STRING
  },
  avatar:{
    type: Sequelize.STRING
  }
})
  Notes.sync()
  Users.sync()
//   Users.findOrCreate({where: {uid: '13544002'}, defaults: {username: 'Technical Lead JavaScript'}})
//   .spread((user, created) => {
//     console.log(user.get({
//       plain: true
//     }))
//     console.log(created)
// // })
// Users.findAll({raw: true}).then(projects => {
//   // projects will be an array of all Project instances
//   console.log(projects)
// })



  //force: true will drop the table if it already exists
// Notes.sync({force:true})
  /*
  Notes.sync().then(() => {
    // Table created
    Notes.create({
       text: 'hello world',
    }).then(() =>{
      Notes.findAll({raw: true}).then(notes => {
        console.log(notes)
      })
    });
    
  
  });
  */


// Notes.findAll({ raw: true }).then(note => {
//     console.log(note)
// })
// Notes.findById(1).then(project =>{
//   console.log(project)
//   project.update({
//     text:'text-moify'
//   }).then((project) =>{
//     console.log(project)
//   })
// })

module.exports = {
  Users,
  Notes,
}