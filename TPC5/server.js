var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')
var imake = require('./indexMaker')

var style = /w3\.css/g
var index = /index/g
var obra = /obra\/m[0-9]+/g

imake.indexMaker()

http.createServer((req,res) => {
    var purl = url.parse(req.url,true)
    console.log('Recebi um pedido: '+purl.pathname)

    if(index.test(purl.pathname)) {
        res.writeHead(200, {'Content' : 'text/html'})
        fs.readFile('json/index.json', (erro,dados) => {
            if(!erro) {
                var myObj = JSON.parse(dados)
                //console.log(myObj)
                res.write(pug.renderFile('views/index.pug', myObj))
            } else res.write("<p><b>ERRO: </b>"+erro+"</p>")
            res.end()
         })
    } else if(obra.test(purl.pathname)) {
        var file = purl.pathname.split('/')[2] + '.json'
        res.writeHead(200, {'Content' : 'text/html'})
        fs.readFile('json/'+file, (erro,dados) => {
            if(!erro) {
                var myObj = JSON.parse(dados)
                res.write(pug.renderFile('views/obra.pug', myObj))
            } else res.write("<p><b>ERRO: </b>"+erro+"<p>")
            res.end()
        })
    } else if(style.test(purl.pathname)) {
        res.writeHead(200, {'Content' : 'text/css'})
        fs.readFile('style/w3.css', (erro,dados) => {
            if(!erro) {
                res.write(dados)
            } else res.write("<p><b>ERRO: </b>"+erro+"</p>")
            res.end()
        })
    } else {
        res.writeHead(200, {'Content' : 'text/html'})
        res.write("<p><b>ERRO: </b>"+purl.pathname+"</p>")
        res.write('<p> Rota desconhecida </p>')
        res.end()
    }

}).listen(6001, () => {
    console.log('Servidor à escuta na porta: 6001\n')
})