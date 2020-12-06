const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    nombre: String,
    userid: String, 
    correo: String,
    specs: String,
    juegop: String,
    info: String,
})


module.exports = mongoose.model("Mejorar PC ", dataSchema);
