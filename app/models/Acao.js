const mongoose = require("mongoose")

const AcaoSchema = mongoose.Schema({
    acao: {
        type: Number,
        require: true
    },
    quantidade: {
        type: Number,
        require: true
    },
    acaoTerminaEm: {
        type: Number,
        require: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios"
    }
})
mongoose.model("acoes", AcaoSchema)