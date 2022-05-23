<<<<<<< Updated upstream
=======
import mongoose from 'mongoose'
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
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        default: 0.00
    }
})

module.exports = mongoose.model('Produto', schema)
>>>>>>> Stashed changes
