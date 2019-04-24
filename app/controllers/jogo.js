module.exports.jogo = function(application, req, res){
    if(req.session.autorizado){
        res.render("jogo")
        return
    }
    res.send("Usuário precisa fazer login")
}

module.exports.sair = function(application, req, res) {
    req.session.destroy(function(error){
        res.redirect("/")
    })    
}