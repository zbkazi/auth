const {Schema, model} = require('mongoose')



const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        index: true,
        min: 2,
        max: 10,
        
    },
    middleName: {
        type: String,
        default: null,
        trim: true,
        min: 2,
        max: 10,

        
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        index: true,
        min: 2,
        max: 10,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        min: 2,
        max: 10,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    dateOfBirth: {
        type: String,
        required: true,
        index: true,
        trim: true,
        unique: true,
        min: 2,
        max: 10
    },
    phoneNumber: {
        type: String,
        required: true,
        index: true,
        unique: true,
        min: 11,
        max: 12
    },
    address: {
        type: String,
        required: true,
        index: true,
        min: 2,
        max: 100
    },
    image: {
        type: String,
        required: true,
        index: true,
        min: 2,
        max: 100,
    },
    status: {
        type: String,
        required: true,
        index: true,
        default: "active"

    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        min: 2,
        max: 100,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, "Must match an email address!"],

    },
    password: {
        type: String,
        required: true,
        index: true,
        min: 2,
        max: 224,

    },

}, {
    timestamps: true
})


const User = model('User', userSchema)


module.exports = User;