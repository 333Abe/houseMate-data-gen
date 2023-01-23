const { faker } = require("@faker-js/faker");
const fs = require("fs");

function randomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

const householdsToCreate = 10;
const maxUsersPerHousehold = 4;

const households = { households: [] };
const loginRegister = { users: [] };

for (let i = 0; i < householdsToCreate; i++) {
  const surname = faker.name.lastName();
  const numberOfUsers = randomInt(maxUsersPerHousehold);
  const numberOfTasks = randomInt(maxUsersPerHousehold);

  let household = {
    // _id: faker.datatype.uuid(),
    household_id: "h" + faker.datatype.uuid(),
    name: surname + " household",
    household_password: faker.word.adjective() + faker.word.noun(),
    description: faker.lorem.sentence(),
    users: [],
    tasks: [],
  };

  for (let i = 0; i < numberOfUsers; i++) {
    let user = {
      id: "u" + faker.datatype.uuid(),
      permissions: i === 0 ? ["admin"] : ["member"],
      currScore: randomInt(50),
    };
    household.users.push(user);
  }

  for (let i = 0; i < numberOfUsers; i++) {
    let user = {
      user_id: household.users[i].id,
      firstName: faker.name.firstName(),
      lastName: surname,
      picture: faker.image.avatar(),
      email: faker.internet.email(),
      hash: faker.internet.password(),
      salt: faker.datatype.uuid(),
      household_password: household.household_password,
    };
    loginRegister.users.push(user);
  }

  for (let i = 0; i < numberOfTasks; i++) {
    let task = {
      task_id: "t" + faker.datatype.uuid(),
      user_id: faker.helpers.arrayElement(household.users).id,
      timestamp: faker.date.recent(),
      title: faker.hacker.ingverb(),
      description: faker.hacker.phrase(),
      completion: faker.datatype.boolean(),
      task_value: randomInt(10),
      tags: faker.word.noun(),
    };
    household.tasks.push(task);
  }
  household.currWinner =
    household.users[randomInt(household.users.length) - 1].id;
  households.households.push(household);
}

const hhString = JSON.stringify(households);
const userString = JSON.stringify(loginRegister);

fs.writeFile("households.json", hhString, "utf8", (err) => {
  if (err) {
    console.log(err, "error creating households.json");
  }
  console.log("households.json created");
});

fs.writeFile("loginRegister.json", userString, "utf8", (err) => {
  if (err) {
    console.log(err, "error creating loginRegister.json");
  }
  console.log("loginRegister.json created");
});
