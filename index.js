const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    name: "Marnie Bibbs",
    number: "(954) 823-1278",
    id: 1,
  },
  {
    name: "Zamazie Book",
    number: "(363) 463-4638",
    id: 2,
  },
  {
    name: "Archie Reynolds",
    number: "(563) 753-8763",
    id: 3,
  },
  {
    name: "Blix Shaw",
    number: "(958) 853-8758",
    id: 4,
  },
];

const info = `<p>Phonebook has info for ${
  persons.length
} people</p><p>${new Date()}</p>`;

const generateId = () => {
  return Math.floor(Math.random() * 100000);
};

app.get("/", (request, response) => {
  response.send("<h1>Phonebook!</h1>");
});

app.get("/info", (request, response) => {
  response.send(info);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id != id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: "Please provide both name and number" });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
