import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = new Schema({
    idCliente: {
        type: String,
        required: true,
        trim: true,
        Cliente: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cliente'
        }]
    },
    idProduto: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        Produto: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto'
        }]
    },
})

module.exports = mongoose.model('ListaDesejos', schema)