/*
request   {} 
response  {status:0, message:'ok', result:[{note}, {note}...] } 成功
          {status:1, errorMessage:'error’} 失败
1.获取所有notes  GET    /api/notes
2.创建一个 note  POST   /api/note/create    {note: 'string'}
3.修改一个note   POST   /api/note/modify    {note: 'stirng', id: noteid}
4.删除一个note   POST   /api/note/deleted   {id: noteid}
*/

var NOTE_API = (function () {
    return {
        notes:'api/notes',
        create: 'api/note/create',
        modify: 'api/note/modify',
        deleted: 'api/note/deleted'
    }
})()

module.exports = NOTE_API