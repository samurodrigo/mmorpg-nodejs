const mongoose = require("mongoose")

const JogoSchema = mongoose.Schema({
    moeda: {
        type: Number,
        require: true,
        default: 50
    },
    suditos: {
        type: Number,
        require: true,
        default: 20
    },
    temor: {
        type: Number,
        require: true,
        default: Math.floor(Math.random() * 1000)
    },
    sabedoria: {
        type: Number,
        require: true,
        default: Math.floor(Math.random() * 1000)
    },
    comercio: {
        type:Number,
        require: true,
        default: Math.floor(Math.random() * 1000)
    },
    magia: {
        type: Number,
        require: true,
        default: Math.floor(Math.random() * 1000)
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        require: true
    }
})

mongoose.model("jogos", JogoSchema)