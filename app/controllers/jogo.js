const mongoose = require("mongoose")
const Jogo = mongoose.model("jogos")
const Usuario = mongoose.model("usuarios")
const Acao = mongoose.model("acoes")
module.exports.jogo = function(application, req, res){
    if(!req.session.autorizado){
        res.send("Usuário precisa fazer login")
        return
    }
    Usuario.findOne({usuario: req.session.usuario})
    .populate("jogo")
    .then((usuario)=> {
        res.render("jogo", {usuario: usuario})    
    })
}

module.exports.sair = function(application, req, res) {
    req.session.destroy(function(error){
        res.redirect("/")
    })    
}

module.exports.suditos = function(application, req, res) {
    res.render("aldeoes")     
}

module.exports.pergaminhos = function(application, req, res) {
    res.render("pergaminhos")   
}

module.exports.ordenarAcaoSudito = function(application, req, res) {
    let acao = req.body
    
    req.assert("acao", "Ação deve ser informada").notEmpty()
    req.assert("quantidade", "Quantidade deve ser informada").notEmpty()

    var erros = req.validationErrors()

    if(erros)
    {
        req.flash("error_msg", erros)
        res.redirect("/jogo")
        return
    }
    
    let time = null
    let date = new Date()
    switch(acao.acao){
        case 1: time = 1 * 60 * 60000 
        case 2: time = 2 * 60 * 60000
        case 3: time = 5 * 60 * 60000
        case 4: time = 5 * 60 * 60000
    }
    acao.acaoTerminaEm = date.getTime() + time
    acao.usuario = req.session.idUsuario
    new Acao(acao).save().then(function(a) {
        console.log(a)
        req.flash("success_msg", "Ação gravada com sucesso!")
        res.redirect("/jogo")
    })
    .catch((error) => {
        console.log(error)
        req.flash("error_msg", ["Não foi possível salvar a ação"])
        res.redirect("/jogo")
    })
    
    
}