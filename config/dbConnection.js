var mongoose = require("mongoose")
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true })
.then(() => {
    console.log("Conexão com o mongodb realizada com sucesso!")
})
.catch((err) => {
    console.log(err)
})