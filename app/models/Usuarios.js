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
    }
})
mongoose.model("usuarios", UsuarioSchema)