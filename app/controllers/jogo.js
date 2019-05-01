const mongoose = require("mongoose")
const Jogo = mongoose.model("jogos")
const Usuario = mongoose.model("usuarios")
const Acao = mongoose.model("acoes")
module.exports.jogo = function(application, req, res){
    if(!req.session.autorizado){
        req.flash("error_msg", "Senhor, por favor, qual o seu usuário e senha?")
        res.redirect("/")
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
    if(!req.session.autorizado){
        res.send("Usuário precisa fazer login")
        return
    }  
    Acao.find({usuario: req.session.idUsuario, acaoTerminaEm: {
        $gt: new Date().getTime()
    }}).then(function(acoes){
        res.render('pergaminhos', {acoes: acoes})
    })
    .catch(error => {
        console.log(error)
    })
}

module.exports.ordenarAcaoSudito = function(application, req, res) {
    let acao = req.body
    
    req.assert("acao", "Senhor, qual é sua ordem?").notEmpty()
    req.assert("quantidade", "Senhor, qual a quantidade de aldeões?").notEmpty()

    var erros = req.validationErrors()

    if(erros)
    {
        req.flash("error_msg", erros)
        res.redirect("/jogo")
        return
    }
    
    let time = null
    let date = new Date()
    let moedas = 0
    switch(parseInt(acao.acao)){
        case 1: 
            time = 1 * 60 * 60000; 
            moedas = -2 * acao.quantidade
            break;
        case 2: 
            time = 2 * 60 * 60000;
            moedas = -3  * acao.quantidade
            break;
        case 3:
        case 4: 
            time = 5 * 60 * 60000;
            moedas = -1  * acao.quantidade
            break;
    }


    acao.acaoTerminaEm = date.getTime() + time
    acao.usuario = req.session.idUsuario
    new Acao(acao).save().then(function(a) {
        Jogo.updateOne({usuario: req.session.idUsuario}, {$inc: {
            moeda: moedas,
            suditos: (acao.quantidade * -1)
        }}).then(result => {
            req.flash("success_msg", "Senhor, a ação foi executada com sucesso!")
            res.redirect("/jogo")            
        })        
    })
    .catch((error) => {
        req.flash("error_msg", ["Senhor, clamo por misericórdia, não foi possível cumprir a ordem"])
        res.redirect("/jogo")
    })   
}
module.exports.revogarAcao = function(application, req, res){
    let query = req.query
    Acao.deleteOne({_id: query.id}).then((result)=> {
        req.flash("success_msg", "Senhor, a ação foi removida com sucesso!")
        res.redirect("/jogo")
    })
}