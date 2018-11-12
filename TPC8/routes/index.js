var express = require('express');
var router = express.Router();
var jf = require('jsonfile')
var formidable = require('formidable')
var fs = require('fs')

var myBD = __dirname + '/database.json'
/* GET home page. */
router.get('/', (req,res)=> res.render('index'));

router.get('/table',(req,res)=> {
  jf.readFile(myBD, (erro,files)=> {
    if(!erro) res.render('lista', {lista: files})
    else res.render('error',{error: erro})
  })
})

router.post('/update', (req,res) => {
  var f = req.body.file
  var d = req.body.desc
  jf.readFile(myBD, (erro,files) => {
    if(!erro) {
      files.push({file: f, desc: d})
      jf.writeFile(myBD,files,erro2 => {
        if(!erro2)
          console.log('File Saved!')
        else res.render('error',{error: erro2})
      })
    } else res.render('error', {error: erro})
  })
  res.json(f)
})

router.post('/add',(req,res)=>{
  var form = new formidable.IncomingForm()
  var r = JSON.stringify('')
  form.parse(req,(erro,fields,files)=>{
    var fenviado = files.file.path
    var fnovo = './public/images/'+files.file.name
    r = JSON.stringify(files.file.name)
    fs.rename(fenviado,fnovo,erro1=>{
      if(!erro1)
        res.json(r)
      else res.render('error', {error:erro1})
    })
  })
})

module.exports = router;
