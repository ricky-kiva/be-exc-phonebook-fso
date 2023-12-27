const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
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

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to Phonebook App</h1>
        <p>Visit <i><b>/api/persons</b></i> to show list of persons in our phonebook!</p>
    `)
})

app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    person ? res.json(person) : res.status(404).end()
})

app.post('/api/persons', (req, res) => {
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

    if (persons.some(p => p.name.toLowerCase() === body.name.toLowerCase())) {
        return res.status(400).json({
            "error": "name must be unique"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

const generateId = () => {
    let newId

    do { newId = Math.floor(Math.random() * 1000000) + 1 }
        while (persons.some(p => p.id === newId))

    return newId
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})