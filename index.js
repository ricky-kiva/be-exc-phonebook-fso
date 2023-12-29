const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()

const Person = require('./models/person')

const app = express()

morgan.token('post-body', (req, res) => {
    if (req.method === 'POST' && req.body) {
        return JSON.stringify(req.body)
    }
    return ' '
})

const MORGAN_FORMAT = ':method :url :status :res[content-length] - :response-time ms :post-body'

app.use(express.json())
app.use(cors())
app.use(morgan(MORGAN_FORMAT))
app.use(express.static('dist'))

app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(person => res.json(person))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    
    Person.findById(id)
        .then(person => person? res.json(person) : res.status(404).end())
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (body.name.trim() === '') {
        return res.status(400).json({
            "status": "error",
            "message": "name is missing"
        })
    }

    if (body.number.trim() === '') {
        return res.status(400).json({
            "status": "error",
            "message": "number is missing"
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => res.json(savedPerson))
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const id = req.params.id

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(id, person, { new: true })
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id

    Person.findByIdAndDelete(id)
        .then(result => res.status(204).end())
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') { 
        return res.status(400).send({
            status: 'error',
            message: 'Malformatted id'
        })
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({
            status: 'error',
            message: error.message
        })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})