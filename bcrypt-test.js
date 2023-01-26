const bcrypt = require("bcrypt");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const loginDetails = {
  users: [
    { email: "Marc.Mills44@gmail.com", password: "thunderousself-esteem" },
    { email: "Armani.Sporer76@hotmail.com", password: "sunnystrip" },
    {
      email: "Douglas_McCullough@gmail.com",
      password: "doublepocket-watch",
    },
  ],
};

const hashedDetails = {
  users: [
    {
      email: "Marc.Mills44@gmail.com",
      hashed_password:
        "$2b$10$v9oPLsIArV063l1kkgPWA.sqGm1z5LLicxnq7m5zEvwnDHlecAqn2",
    },
    {
      email: "Armani.Sporer76@hotmail.com",
      hashed_password:
        "$2b$10$SlGwz4OmL8rXWk7TzjPKk.6eaWhNaneYhF5p9ayVhj0KU0DALZGrq",
    },
    {
      email: "Douglas_McCullough@gmail.com",
      hashed_password:
        "$2b$10$3pjA0qvj9hpBpJLtNU4PIOckI9woG.aO54OCVvUlKRa0FY7rV6mgy",
    },
  ],
};

rl.question("enter email: ", (answer) => {
  const user = hashedDetails.users.find((user) => (user.email = answer));
  if (user === null) {
    console.log("cannot find user");
  } else {
    // console.log(answer);
    rl.question("enter password: ", async (pword) => {
      console.log(await bcrypt.compare(pword, user.hashed_password));
    });
  }
});
