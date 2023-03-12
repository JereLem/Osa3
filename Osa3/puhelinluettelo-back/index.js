require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const Person = require('./models/Person')

app.use(express.static('build'))
app.use(bodyParser.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body'));
app.use(cors());


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
});

app.get('/api/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(
      `<div>
        <p>Phonebook has info for ${persons.length} people</p>
      </div>
      <div>
        <p>${new Date().toString()}</p>
      </div>`
    )
  })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number
  });
  person.save().then(savedPerson => savedPerson.toJSON()).then(savedAndFormatted => {
    res.json(savedAndFormatted)
  })
  .catch(error => next(error))
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id).then(() => {
    res.status(204).end()
  }).catch(error => next(error))
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })

  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})