const { faker } = require("@faker-js/faker");
const fs = require("fs");
const bcrypt = require("bcrypt");

function randomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

let numUsers = 0;
let numTasks = 0;

const households = [];
const loginRegister = [];
const testLoginDetails = [];

async function createHouseholds(
  householdsToCreate = 10,
  maxUsersPerHousehold = 5,
  maxTasksPerHousehold = 15
) {
  for (let i = 0; i < householdsToCreate; i++) {
    const surname = faker.name.lastName();
    const numberOfUsers = randomInt(maxUsersPerHousehold);
    const numberOfTasks = randomInt(maxTasksPerHousehold);
    numUsers += numberOfUsers;
    numTasks += numberOfTasks;

    let household = {
      name: surname + " household",
      household_password: faker.word.adjective() + faker.word.noun(),
      description: faker.lorem.sentence(),
      users: [],
      tasks: [],
    };

    for (let i = 0; i < numberOfUsers; i++) {
      let user = {
        permissions: i === 0 ? ["admin"] : ["member"],
        currScore: randomInt(50),
        name: `${faker.name.firstName()} ${surname}`,
        picture: faker.image.avatar(),
        email: faker.internet.email(),
      };
      household.users.push(user);
    }

    for (let i = 0; i < numberOfUsers; i++) {
      const userLogin = {};
      const password = faker.word.adjective() + faker.word.noun();
      const hashedPassword = await bcrypt.hash(password, 10);
      let user = {
        email: household.users[i].email,
        hashed_password: hashedPassword,
      };
      userLogin.email = user.email;
      userLogin.password = password;
      testLoginDetails.push(userLogin);
      loginRegister.push(user);
    }

    for (let i = 0; i < numberOfTasks; i++) {
      let task = {
        email: faker.helpers.arrayElement(household.users).email,
        created_at: faker.date.recent(),
        deadline: i % 2 === 0 ? faker.date.future() : null,
        title: faker.hacker.ingverb(),
        description: faker.hacker.phrase(),
        completion: faker.datatype.boolean(),
        task_value: randomInt(10),
        tags: i % 3 === 0 ? [faker.word.noun()] : null,
      };
      household.tasks.push(task);
    }
    household.currWinner =
      household.users[randomInt(household.users.length) - 1].email;
    households.push(household);
  }
  const hhString = JSON.stringify(households);
  const userString = JSON.stringify(loginRegister);
  const loginsString = JSON.stringify(testLoginDetails);

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

  fs.writeFile("testLoginDetails.json", loginsString, "utf8", (err) => {
    if (err) {
      console.log(err, "error creating testLoginDetails.json");
    }
    console.log("testLoginDetails.json created");
  });

  console.log(`${numTasks} tasks created; ${numUsers} users created`);
}

async function main() {
  await createHouseholds();
}
main();
