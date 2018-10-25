var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')
var jf = require('jsonfile')
var {parse} = require('querystring')

var port = 6006
var myBD = 'data/teses.json'

var myServer = http.createServer((req,res)=>{
    var purl = url.parse(req.url, true)

    if(req.method == 'GET') {
        if(purl.pathname=='/') {
            res.end(pug.renderFile('views/home.pug'))
        }
        else if(purl.pathname == '/registo') {
            res.end(pug.renderFile('views/form-thesis.pug'))
        }
        else if(purl.pathname == '/lista') {
            jf.readFile(myBD, (err,thesis) => {
                if(!err) res.end(pug.renderFile('views/list-thesis.pug',{list: thesis}))
                else res.end('views/erro.pug')
            })
        }
        else if(purl.pathname == '/w3.css') {
            res.writeHead(200, {'Content-Type' : 'text/css'})
            fs.readFile('stylesheets/w3.css', (err,data) => {
                if(!err) res.end(data)
                else res.end(pug.renderFile('views/erro.pug'))
            })
        }
        else {
            res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
            res.end('Erro: ' + purl.pathname + ' não implementado')
        }
    }
    else if(req.method == 'POST') {
        if(purl.pathname == '/processaForm') {
            retriveInfo(req, result => {
                jf.readFile(myBD, (err,thesis) => {
                    if(!err) {
                        thesis.push(result)
                        jf.writeFile(myBD, thesis, err2 => {
                            if(!err2) console.log('Registo Gravado Com Sucesso')
                            else console.log('Erro: ' + err2)
                        })
                    } else console.log('Erro: ' +erro)
                })
                res.end(pug.renderFile('views/received-thesis.pug',{t: result}))
            })
        }
        else {
            res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
            res.end('Erro: ' + purl.pathname + ' não implementado')
        }
    }
    else {
        res.writeHead(503, {'Content-Type' : 'text/html;charset=utf-8'})
        res.end('Erro: ' + req.method + ' Método não suportado!')
    }
})

myServer.listen(port, ()=>{
    console.log('----- Servidor à escuta na porta: ' + port + ' -----')
})

function retriveInfo (req, callback) { 
    const FORM_URLENCODED = 'application/x-www-form-urlencoded'
    if(req.headers['content-type'] === FORM_URLENCODED){
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            callback(parse(body))
        })
    } else callback(null)
}
