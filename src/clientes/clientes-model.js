import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

// import ListaDesejosSchema from '../listasDesejos/listasDesejos-model'
const {ListaDesejosSchema} = require(__dirname.substring(0, __dirname.length - 8) + 'listasDesejos\\listasDesejos-model.js')

const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    birthday: {
        type: Date,
        required: true,
        trim: true
    },

    cpf: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    phoneNumber: {
        type: Number,
        required: true,
        trim: true
    },

    wishlists: [ ListaDesejosSchema ] 
    
})

schema.plugin(mongoosePaginate)


module.exports = mongoose.model('Cliente', schema)