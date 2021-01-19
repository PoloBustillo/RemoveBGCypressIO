/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const fs = require("fs-extra");
const path = require("path");

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  on("task", {
    hello({ greeting, name }) {
      console.log("%s, %s", greeting, name);

      return null;
    },
    files() {
      const downloadDirectory = path.join(
        __dirname,
        "..",
        "/fixtures/downloads/imgs/"
      );
      console.log(downloadDirectory);
      let array = [];
      fs.readdirSync(downloadDirectory).forEach((file) => {
        if (file !== "files.json") {
          array.push({ file: file });
          console.log(file);
        }
      });
      return null;
    },
    fileRename({ oldName, newName }) {
      const downloadDirectory = path.join(
        __dirname,
        "..",
        "/fixtures/downloads/imgs/"
      );

      fs.copySync(downloadDirectory + oldName, downloadDirectory + newName);
      fs.removeSync(downloadDirectory + oldName);

      return null;
    },
  });

  on("before:browser:launch", (browser = {}, launchOptions) => {
    const downloadDirectory = path.join(
      __dirname,
      "..",
      "fixtures/downloads/imgs"
    );
    if (browser.family === "chromium") {
      launchOptions.preferences.default["download"] = {
        default_directory: downloadDirectory,
      };
    }
    return launchOptions;
  });
};
