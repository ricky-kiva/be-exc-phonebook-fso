const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log('Connecting to', url)
mongoose.connect(url)
    .then(result => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err.message))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    number: String
})

personSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)