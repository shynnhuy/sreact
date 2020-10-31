const fs = require("fs");
const path = require("path");
const ncp = require("ncp");
const { red, yellow, yellowBright, greenBright } = require("chalk");
const Listr = require("listr");

const { promisify } = require("util");
const { projectInstall, install } = require("pkg-install");
const { WEBPACK } = require("./constants");

const access = promisify(fs.access);
const copy = promisify(ncp);

const targetDirectory = process.cwd();
module.exports = {
  async CreateJS(answer) {
    const { name, bundler, router, redux } = answer;

    let templateDirectory = path.resolve(__dirname, "./webpack/js");

    if (bundler === WEBPACK) {
      templateDirectory = path.resolve(__dirname, "./webpack/js");
    } else {
      templateDirectory = path.resolve(__dirname, "./parcel/js");
    }

    try {
      await access(templateDirectory, fs.constants.R_OK);
    } catch (err) {
      console.error(`${red.bold("ERROR")} Invalid bundler name`);
      process.exit(1);
    }

    generateTemplate(templateDirectory, name, router, redux);
  },
  // async CreateTS(options) {
  //   const templateDirectory = path.resolve(__dirname, "./templates/ts");
  //   try {
  //     await access(templateDirectory, fs.constants.R_OK);
  //   } catch (err) {
  //     console.error(`${red.bold("ERROR")} Invalid template name`);
  //     process.exit(1);
  //   }
  // },
};

const generateTemplate = async (templateDirectory, name, router, redux) => {
  const tasks = new Listr([
    {
      title: "Generating NnyhS React files...",
      task: async () =>
        await copyTemplateFiles(targetDirectory, templateDirectory, name),
    },
    {
      title: "Installing dependencies...",
      task: async () =>
        await projectInstall({
          cwd: path.resolve(targetDirectory, name),
          prefer: "yarn",
        }),
    },
    router
      ? {
          title: "Installing react-router-dom library",
          task: async () =>
            await install(
              {
                "react-router-dom": undefined,
              },
              {
                cwd: path.resolve(targetDirectory, name),
                prefer: "yarn",
              }
            ),
        }
      : {
          title: "Skipping install react-router-dom",
          task: () => {},
        },
    redux
      ? {
          title: "Initializing redux library",
          task: async () => {
            const redux = path.resolve(targetDirectory, name, "src/redux");
            await install(
              {
                redux: undefined,
                "react-redux": undefined,
                "redux-thunk": undefined,
                "redux-devtools-extension": undefined,
              },
              {
                cwd: path.resolve(targetDirectory, name),
                prefer: "yarn",
              }
            );
            await copy(path.resolve(__dirname, "./redux"), redux);
          },
        }
      : { title: "Skipping initializing redux", task: () => {} },
  ]);

  try {
    await tasks.run();
    console.log(
      `
  ${yellow.bold("DONE")} New NnyhS React project has been generated.
  ${yellowBright.bold("Start coding: ")}
  ${greenBright(`cd ./${name}
  yarn start`)}
      `
    );
  } catch (error) {
    console.log(red(error));
  }
};

const copyTemplateFiles = async (targetDirectory, templateDirectory, name) => {
  const projectDirectory = path.resolve(targetDirectory, name);
  copy(templateDirectory, projectDirectory, {
    clobber: false,
  });
};
