import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = new Schema({
    idCliente: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        Cliente: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cliente'
        }]
    },
    idProduto: {
        type: String,
        required: true,
        trim: true,
        //add regra de incluir apenas um tipo de produto/id por lista.
        Produto: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto'
        }]
    },
        nameList: {
        type: String,
        required: true,
        trim: true,
    },
})

module.exports = mongoose.model('ListaDesejos', schema)