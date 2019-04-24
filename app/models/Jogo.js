const mongoose = require("mongoose")

const JogoSchema = mongoose.Schema({
    modela: {
        type: Number,
        require: true
    },
    suditos: {
        type: Number,
        require: true
    },
    temor: {
        type: Number,
        require: true
    },
    sabedoria: {
        type: Number,
        require: true
    },
    comercio: {
        type:Number,
        require: true
    },
    magia: {
        type: Number,
        require: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        require: true
    }
})

mongoose.model("jogos", JogoSchema)