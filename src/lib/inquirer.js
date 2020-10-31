const inquirer = require("inquirer");
const constants = require("../constants");

module.exports = {
  askGithubCredentials: () => {
    const questions = [
      {
        name: "name",
        type: "input",
        message: "Enter your mern project name: ",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your mern project name.";
          }
        },
      },
      {
        name: "bundler",
        type: "list",
        message: "Choose your React module bundler (Webpack/Parcel):",
        choices: [constants.WEBPACK, constants.PARCEL],
      },
      // {
      //   name: "template",
      //   type: "list",
      //   message: "Choose your React template (Javascript/Typescript):",
      //   choices: ["Javascript"],
      // },
      {
        name: "router",
        type: "confirm",
        message: "Add react-router-dom to project?:",
      },
      {
        name: "redux",
        type: "confirm",
        message: "Add redux to project?:",
      },
    ];
    return inquirer.prompt(questions);
  },
};
