const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    solucion: Number,
    tiempor: Number, 
    satisfecho: Number,
    recomendar: Number,
    opinion: String,
   
})


module.exports = mongoose.model("Calificacion", dataSchema);

