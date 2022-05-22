import mongoose from 'mongoose'
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
    }
})

module.exports = mongoose.model('Cliente', schema)