require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001
const bodyParser = require('body-parser');
const Person = require('./models/Person')


app.use(bodyParser.json());

app.use(express.static('../puhelinluettelo-front/puhelinluettelo/build'))

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
      response.json(persons)
  })
});


app.get('/api/persons/:id', (req, res) => {
  Person.findById(request.params.id).then(person => {
      response.json(person)
})
});


app.get('/api/info', (req, res) => {
  Person.find({}).then(persons => {
    response.send(
      `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      </div>
      <div>
      <p>${new Date().toString()}</p>
      </div>`
    )
  })
})

app.post('/api/persons', (req, res) => {
  const body = request.body
  console.log(body.name)
  if (!body.name || !body.number) {
      return response.status(400).json({
          error: 'The name or number is missing'
        })
  } else if (Person.find({ name: body.name })) {
      return response.status(400).json({
          error: 'Name must be unique'
        })
  }
  const person =  new Person({
    //id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number
  });
  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const index = parseInt(id) - 1;
  if (isNaN(index) || index < 0 || index >= persons.length) {
    res.status(404).end()
  } else {
    persons = persons.filter(person => person.id !== id.to)
    res.status(204).end()
  }
});


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})