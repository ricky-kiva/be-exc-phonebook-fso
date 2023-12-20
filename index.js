const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "id": 1,
        "number": "Arto Hellas",
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
    res.send("<h1>Welcome to Phonebook App</h1><p>Visit <i><b>/api/persons</b></i> to show list of persons in our phonebook!</p>")
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})