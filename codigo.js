const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    codigoidi: String,
})



module.exports = mongoose.model("Codigos", dataSchema);
