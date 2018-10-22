var fs = require('fs')
var fileJ = /m[0-9]+\.json/

function ReadAppend(file,append) {
    fs.readFile(append, (erro,data) => {
        if(erro) console.log(erro)

        fs.appendFile(file,data+',',(erro) => {
            if(erro) console.log(erro)
        })
    })
}

function FinishAppend(file,append) {
    fs.readFile(append, (erro,data) => {
        if(erro) console.log(erro)
        
        fs.appendFile(file,data+'\n]\n}',(erro)=>{
            if(erro) console.log(erro)
        })
    })
}

function InitAppend(file,append) {
    fs.readFile(append, (erro,data) => {
        if(erro) console.log(erro)
        
        fs.writeFile(file,'{\n\"files\":['+data+',',(erro)=>{
            if(erro) console.log(erro)
        })
    })
}

exports.indexMaker = () => {
    fs.readdir('json',(erro,files) => {
        if(erro) console.log(erro)
        else{
            files.sort(function(a, b){
                if(a < b) { return -1; }
                if(a > b) { return 1; }
                return 0;
            }).forEach((file) => {
                if(fileJ.test(file)){
                    if(file=='m1.json') {
                        InitAppend('./json/index.json','./json/'+file)
                    } else if(file=='m96.json') {
                        FinishAppend('./json/index.json','./json/'+file)
                    } else {
                        ReadAppend('./json/index.json','./json/'+file)
                    }
                }
            })
        }
    })
}

