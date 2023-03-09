const { request } = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001

const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.static('../puhelinluettelo-front/puhelinluettelo/build'))
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body'));
app.use(cors());

let persons = [
  { id: 1, name: 'Arto hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary poppendick', number: '39-23-6423122' }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (req, res) => {
  res.json(persons);
});


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


app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const index = parseInt(id) - 1;
  if (isNaN(index) || index < 0 || index >= persons.length) {
    res.status(404).end()
  } else {
    res.json(persons[index]);
  }
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


app.get('/api/info', (req, res) => {
  var count = Object.keys(persons).length;
  var info = `The phonebook has info for ${count} people. ${new Date().toString()}`;
  res.send(info);
})


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})