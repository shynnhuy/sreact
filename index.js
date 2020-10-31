#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

const { CreateJS } = require("./src/generator");
clear();

console.log(
  chalk.green(figlet.textSync("Shynn React", { horizontalLayout: "full" }))
);

const inquirer = require("./src/lib/inquirer");

const run = async () => {
  const answer = await inquirer.askGithubCredentials();
  CreateJS(answer);
  // if (template === "Javascript") {
  //   CreateJS(name, router);
  // } else if (template === "Typescript") {
  //   CreateTS(name, router);
  // } else {
  //   CreateJS(name, router);
  // }
};

run();
