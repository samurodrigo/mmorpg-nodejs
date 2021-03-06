/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

// importar o módulo express-session
var expressSession = require("express-session");

// importa connect flash
var flash = require("connect-flash")

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */
app.use(expressValidator());

//configura o middleware express-session
app.use(expressSession({
	secret: 'u0c19u3mr90u1m2',
	resave: false,// faz com que a sessão seja regravada no servidor, mesmo nao tendo alteração
	saveUninitialized: false // cria uma sessão nova sempre que a mesma for modificada
}))

app.use(flash())

// Middleware
app.use((req, res, next) => {
	res.locals.error_msg = req.flash("error_msg")
	res.locals.success_msg = req.flash("success_msg")
	next()
})

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then("config/dbConnection.js")
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;