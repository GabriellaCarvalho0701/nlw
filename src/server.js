/*require('express')()
.get("/", (req, res) => {
    return res.send("Hi from NLW")
})
.get("/study", (req, res) => {
    return res.send("Study")
})
.listen(5500)*/

/*Adiciona-se o Nodemon para atualizar o código naturalmente e também o express para agilizar na criação do servidor / Para rodar: npm run dev*/

/*Nunjucks dá-te muitas funcionalidades*/

//Servidor
const express = require('express')
const server = express()

const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')

//Configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true, //Deixa as coisas mais rápidas]
})

//Inicio e configuração do servidor
server
//Receber os dados do req.body no pages.js -> Para não passar pela url as informações
.use(express.urlencoded({ extended: true })) 

// Configurar arquivos estáticos (css, scrips, imagens)
.use(express.static("public"))
//Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)

//Starr do Servidor
.listen(5500)