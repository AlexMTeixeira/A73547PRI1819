var http = require('http')
var fs = require('fs')
var pug = require('pug')
var express = require('express')
var formidable = require('formidable')
var logger = require('morgan')
var jf = require('jsonfile')

var port = 6007
var myBD = 'data/index.json'

var app = express()

app.use(logger('tiny'))

app.all('*',(req,res,next) => {
    if(req.url != '/w3.css')
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    next()
})

app.get('/', (req,res) => {
    jf.readFile(myBD, (err,list) => {
        if(!err) {
            res.write(pug.renderFile('views/main.pug', {l: list}))
            res.end()
        } else {
            res.write(pug.renderFile('views/erro.pug',{e: err}))
            res.end();
        }
    })
})

app.post('/processaForm',(req,res) => {
    var form = new formidable.IncomingForm()
    form.parse(req, (erro, fields, files) => {
        if(!erro) {

            var sentF = files.ficheiro.path
            var fname = files.ficheiro.name
            var newF = './data/' + files.ficheiro.name

            fs.rename(sentF,newF, (erro) => {
                if(!erro) {
                    jf.readFile(myBD, (err,list) => {
                        if(!err) {
                            var result = {'file': fname,'path': newF,'desc': fields.desc}
                            list.push(result)
                            jf.writeFile(myBD, list, err1 => {
                                if(!err) {
                                    res.write(pug.renderFile('views/main.pug', {l: list}))
                                    res.end()
                                } else {
                                    res.write(pug.renderFile('views/erro.pug',{e: err}))
                                    res.end();
                                }
                            })
                        } else {
                            res.write(pug.renderFile('views/erro.pug',{e: err}))
                            res.end();
                        }
                    })
                } else {
                    res.write(pug.renderFile('views/erro.pug',{e: erro}))
                    res.end();
                }
            })
        } else {
            res.write(pug.renderFile('views/erro.pug',{e: erro}))
            res.end();
        }
    })
})

app.get('/w3.css',(req,res)=>{
    res.writeHead(200, {'Content-Type' : 'text/css'})
    fs.readFile('stylesheets/w3.css',(erro,dados)=>{
        if(!erro) res.write(dados)
        else res.write(pug.renderFile('views/erro.pug',{e: erro}))
        res.end();
    })
})

http.createServer(app).listen(port, () => {
    console.log('========= Servidor à escuta na porta '+port+' =========')
})