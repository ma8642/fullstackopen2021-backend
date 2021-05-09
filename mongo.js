const mongoose = require("mongoose");

let addToDB = true;

if (process.argv.length > 3 && process.argv.length < 5) {
  console.log(
    "Please provide password, name, and number as arguments: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
} else if (process.argv.length === 3) {
  addToDB = false;
}

const password = process.argv[2];
let [name, number] = ["", ""];
if (addToDB) {
  name = process.argv[3];
  number = process.argv[4];
}

const url = `mongodb+srv://marley_fo21:${password}@cluster0.gnddm.mongodb.net/person-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (addToDB) {
  const person = new Person({
    name,
    number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook!`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
