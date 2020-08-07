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

//Dados
const proffys = [
    {
        name: "Diego Fernandes", 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp:  "40028922",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720], 
        time_to: [1220]
    }, 
    {
        name: "Daniele Evangelista", 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp:  "40028922",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [1],
        time_from: [720], 
        time_to: [1220]
    },
    {
        name: "Charles Lélis Braga", 
        avatar: "https://avatars2.githubusercontent.com/u/59098599?s=460&u=1644a12e4686b8a4335e6689b15a344bde000ef7&v=4",
        whatsapp:  "991591395",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "40",
        weekday: [1],
        time_from: [720], 
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

//Funcionalidades

function getSubject(subjectNumber){
    const position =  +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res){
    return res.render("index.html")
}

function pageStudy(req, res){
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res){
    const data = req.query

    // Pega as chaves e transforma em array [name, avatar...]
    const isNotEmpty = Object.keys(data).length > 0
    
    //Se tiver dados
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)

        //Adicionar os dados a lista de proffys; Bom pra testar: console.log("Entrei")
        proffys.push(data)
        //Redirecionar para a página de aulas
        return res.redirect("/study")
    } else { 
        //Se não, mostrar a página; Bom pra testar: console.log("Não entrei")
        return res.render("give-classes.html", {subjects, weekdays})
    }
}

//Servidor
const express = require('express')
const server = express()

//Configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true, //Deixa as coisas mais rápidas]
})

//Inicio e configuração do servidor
server
// Configurar arquivos estáticos (css, scrips, imagens)
.use(express.static("public"))
//Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)

//Starr do Servidor
.listen(5500)