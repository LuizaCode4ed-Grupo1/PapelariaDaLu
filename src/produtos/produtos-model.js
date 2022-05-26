import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    _code: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        default: 0.00
    },
    brand: {
        type: String,
        default: "Não informado"
    },
    color: {
        type: String,
        default: "Não informado"
    },
    wishlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ListaDesejos'
    }]
})

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('Produto', schema)
