const mongoose = require("mongoose")

const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    },
    casa: {
        type: String,
        require: true
    },
    jogo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jogos"
    }
})
mongoose.model("usuarios", UsuarioSchema)