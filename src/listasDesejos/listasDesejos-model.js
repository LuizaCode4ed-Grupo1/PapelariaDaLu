import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const Schema = mongoose.Schema

const schema = new Schema({
    nameList: {
        type: String,
        required: true,
        trim: true,
    },

    idCliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    
    idProduto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
        required: true
    }],
    
    createdAt : {
        type: Date,
        default: Date.now
    }
})

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('ListaDesejos', schema)