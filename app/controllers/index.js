const mongoose = require("mongoose")

const Usuario = mongoose.model("usuarios")
const crypto = require("crypto")

module.exports.index = function(application, req, res){
    res.render("index", {erros: null})
}

module.exports.autenticar = function(application, req, res){
    var dadosForm = req.body;

    req.assert("usuario", "Usuário não pode ser vazio").notEmpty()
    req.assert("senha", "Senha não pode ser vazia").notEmpty()

    var erros = req.validationErrors()

    if(erros){
        res.render("index", {erros: erros})
        return
    }
    let senha = crypto.createHash("md5").update(dadosForm.senha).digest("hex")
    Usuario.findOne({usuario: dadosForm.usuario, senha: senha}).then(usuario => {
        if(usuario) {
            req.session.autorizado = true
            req.session.usuario = usuario.usuario
            req.session.idUsuario = usuario._id
            req.session.casa = usuario.casa
            res.redirect("/jogo")
        }else{
            res.redirect("/")
        }
    })
    .catch((error) => {
        console.log(error)
    })
}