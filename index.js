require("dotenv").config();
const { request, response } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.static("build"));
const morgan = require("morgan");
app.use(express.json());
morgan.token("body", function (req, res) {
  // display data for POST request
  if (Object.keys(res["req"]["body"]).length > 0) {
    return JSON.stringify(res["req"]["body"]);
  }
  return "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
// 3.16 already did that!
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

const Person = require("./models/person");

const info = (persons) =>
  `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`;

app.get("/", (request, response) => {
  response.send("<h1>Phonebook!</h1>");
});

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(info(persons));
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  // Exercise 3.18 - already did that!
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: "request must include both name and number" });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(person);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(note));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
