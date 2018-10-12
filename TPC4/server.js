var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer( (req,res) => {
    var purl = url.parse(req.url,true)

    var q = purl.query
    var resposta
    var path = purl.pathname

    if(path == "/obra") {
        if(!q.id) {
            resposta = "website/index.html"
        } else {
            resposta = "website/html/obra" + q.id + ".html"
        }

        fs.readFile(resposta, (erro,dados)=>{
            res.writeHead(200, {'Content-Type' : 'text/html'})
            if(!erro)
                res.write(dados)
            else {
                if (erro.code == 'ENOENT')
                    res.write("404 - Page not found!")
                else
                    res.write(erro)
            }
            res.end()
        })
    }
    else if(path == "/manifesto") {
        fs.readFile("manifesto-tp4.html", (erro,dados) => {
            res.writeHead(200, {'Content-Type' : 'text/html'})
            if(!erro)
                res.write(dados)
            else 
                res.write(erro)
            
            res.end()
        })
    } else {
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.write("404 - Page not found!")
        res.end()
    }

}).listen(7456, ()=>{
    console.log("Servidor à escuta na porta 7456...")
})