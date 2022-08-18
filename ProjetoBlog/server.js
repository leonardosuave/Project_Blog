const express = require('express');
const app = express();
const path = require('path')
const session = require('express-session')
const flashMessages = require('connect-flash')
const csrf = require('csurf')
const connection = require('./database/database')

//Import middlewares
const { middlewareGlobal, checkCSRFerror, csrfMiddleware } = require('./src/middlewares/middleware')

//Import routes
const homeRoute = require('./src/routes/homeRoute')
const categoriesRoute = require('./src/routes/categoryRoute')
const articlesRoute = require('./src/routes/articleRoute')
const loginRoute = require('./src/routes/loginRoute')

//Import relate tables and executy the create table
const ArticleModel = require('./database/article');
const CategoryModel = require('./database/category');
const UserModel = require('./database/login')

//view engine
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs'); 

//Session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'Qualquer coisa pode ser', cookie: {maxAge: 1000*60*60}
}))
app.use(flashMessages())

app.use(express.static('public')) //conteúdo estático
app.use(express.urlencoded({extended:false}));
app.use(express.json())

//csrf -> Para segurança de envio de formulários
app.use(csrf())

//Conection DB
connection
    .authenticate()
    .then(() => {
        console.log('Data Base connected!')
        app.emit('ready')
    }).catch((error) =>{
        console.log(error)
    })
    
//express with middlewares
app.use(middlewareGlobal)
app.use(checkCSRFerror)
app.use(csrfMiddleware)    

//express with imports routes    
app.use(homeRoute)
app.use(categoriesRoute)
app.use(articlesRoute)
app.use(loginRoute)

app.on('ready', () => {
    app.listen(8080, () => {
        console.log('Server online')
        console.log('http://localhost:8080')
    })
})