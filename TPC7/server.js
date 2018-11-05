var http = require('http')
var url = require('url')
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

app.get('/w3.css',(req,res)=>{
    res.writeHead(200, {'Content-Type' : 'text/css'})
    fs.readFile('stylesheets/w3.css',(erro,dados)=>{
        if(!erro) res.write(dados)
        else res.write(pug.renderFile('views/erro.pug',{e: erro}))
        res.end();
    })
})

app.get('/', (req,res) => {
    jf.readFile(myBD, (err,list) => {
        if(!err) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('views/main.pug', {l: list}))
            res.end()
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('views/erro.pug',{e: err}))
            res.end();
        }
    })
})

app.get('/ficheiros', (req,res) => {
    jf.readFile(myBD, (err,list) => {
        if(!err) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('views/ficheiros.pug', {l: list}))
            res.end()
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
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
                            var result = {'file': fname,'desc': fields.desc}
                            list.push(result)
                            jf.writeFile(myBD, list, err1 => {
                                if(!err1) {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(pug.renderFile('views/main.pug', {l: list}))
                                    res.end()
                                } else {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(pug.renderFile('views/erro.pug',{e: err}))
                                    res.end();
                                }
                            })
                        } else {
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(pug.renderFile('views/erro.pug',{e: err}))
                            res.end();
                        }
                    })
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile('views/erro.pug',{e: erro}))
                    res.end();
                }
            })
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('views/erro.pug',{e: erro}))
            res.end();
        }
    })
})

app.get(/\/data\/*.*/,(req,res)=>{
    var purl = url.parse(req.url,true)
    fs.readFile('./'+purl.pathname,(erro,dados)=>{
        var file = purl.pathname.split('/')[2]
        if(!erro) {
            if(/[a-zA-Z-_ 0-9]+\.([jJ][pP][eE]?[gG]|[pP][nN][gG])/.test(file))
                res.writeHead(200,{'Content-Type': 'image/jpg'})
            else if(/[a-zA-Z-_0-9]+\.[mM][pP]4/.test(file))
                res.writeHead(200,{'Content-Type': 'video/mp4'})
            else if(/[a-zA-Z-_0-9]+\.[mM][pP](3|[eE][gG])/.test(file))
                res.writeHead(200,{'Content-Type': 'audio/mpeg'})
            else if(/[a-zA-Z-_0-9]+\.[tT][xX][tT]/.test(file))
                res.writeHead(200,{'Content-Type': 'text/plain'})
            else if(/[a-zA-Z-_0-9]+\.[jJ][sS][oO][nN]/.test(file))
                res.writeHead(200,{'Content-Type': 'text/json'})
            else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(pug.renderFile('views/erro.pug',{e: "Formato Não Suportado"}))
                res.end()
            }
            res.write(dados)
            res.end()
        } else { 
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(pug.renderFile('views/erro.pug',{e: erro}))
            res.end()
        }
    })
})

http.createServer(app).listen(port, () => {
    console.log('========= Servidor à escuta na porta '+port+' =========')
})