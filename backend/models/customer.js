const mongoose = require('mongoose')

// create a Schema
const Schema = mongoose.Schema

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true

    },

    balance: {
        type: Number,
    }, 
    user_id: {
        type: String,
        required: true
    }   
}, { timestamps: true })

// create and export the module.
module.exports = mongoose.model('customer', customerSchema)