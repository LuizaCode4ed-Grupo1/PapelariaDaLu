import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = new Schema({
    idCliente: {
        type: String,
        required: true,
        trim: true
    },
    idProduto: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    produto: {
        type: Date,
        required: true,
        trim: true
    },
})

module.exports = mongoose.model('ListaDesejos', schema)