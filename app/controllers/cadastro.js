const mongoose = require("mongoose")
const Usuario = mongoose.model("usuarios")
const Jogo = mongoose.model("jogos")
const crypto = require("crypto")
module.exports.cadastro = function(application, req, res){
    res.render("cadastro", {erros: null, dadosForm: {}})
}

module.exports.cadastrar = function(application, req, res){
    var dadosForm = req.body;

    req.assert("nome", "O campo nome é obrigatório.").notEmpty()
    req.assert("usuario", "O campo usuário é obrigatório").notEmpty()
    req.assert("senha", "O campo senha é obrigatório").notEmpty()
    req.assert("casa", "Selecione uma casa").notEmpty()

    var erros = req.validationErrors()

    if(erros){
        res.render("cadastro", {erros: erros, dadosForm: dadosForm})
        return
    }
    let usuario = new Usuario(dadosForm)
    usuario.senha = crypto.createHash("md5").update(usuario.senha).digest("hex")
    usuario
    .save()
    .then((user) => {
        let jogo = new Jogo({
            usuario: user._id
        })
        .save()
        .then((jogo) => {   
            usuario._id = user._id         
            usuario.jogo = jogo._id
            usuario.save().then(()=>{
                res.redirect("/cadastroRealizado")
            })
        })        
    })
    .catch((error) => {
        console.log(error)
    })
}

module.exports.cadastroRealizado = function(appllication, req, res){
    res.render("cadastroRealizado")
}