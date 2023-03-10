const { req } = require('express');
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
  const body = req.body;
  
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number missing' });
  }
  
  const nameExists = persons.some(person => person.name === body.name);
  if (nameExists) {
    return res.status(400).json({ error: 'Name already exists in the phonebook' });
  }
  
  const person = {
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number
  };
  
  persons.push(person);
  
  res.json(person);
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