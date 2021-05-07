const { request, response } = require("express");
const express = require("express");
const app = express();

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

app.get("/", (request, response) => {
  response.send("<h1>Phonebook!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
