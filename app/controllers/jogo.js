const mongoose = require("mongoose")
const Jogo = mongoose.model("jogos")
const Usuario = mongoose.model("usuarios")
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