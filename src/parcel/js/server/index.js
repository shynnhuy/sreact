import dotenv from "dotenv";
dotenv.config();

import chalk from "chalk";
import app from "./app";

const log = console.log;

const port = process.env.SERVER_PORT;

app.listen(port, () =>
  log(
    chalk.green.bold("Server") +
      chalk.yellow(` running on port `) +
      chalk.red(port)
  )
);
