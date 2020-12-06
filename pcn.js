const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    nombre: String,
    userid: String, 
    correo: String,
    presu: String,
    uso: String,
    info: String,
})



module.exports = mongoose.model("Cotizar PC", dataSchema);
