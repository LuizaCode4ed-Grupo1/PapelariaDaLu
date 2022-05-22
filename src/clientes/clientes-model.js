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
    }
})

module.exports = mongoose.model('Cliente', schema)