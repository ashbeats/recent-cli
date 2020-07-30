const { expandUserPath, expandAppData } = require("@recent-cli/expand-paths");

const minimatch = require("minimatch");

const ignore_path = expandUserPath("../../.recentignore", false);

const fs = require("fs");
const _ = require("lodash/fp");

const default_path = __dirname + "/.recentignore";

function getIgnoreDirectives(path) {
  return fs.existsSync(path)
    ? _.pipe(
        _.partialRight(fs.readFileSync, [{ encoding: "utf8" }]),
        parse
      )(path)
    : false;
}

// console.log("getIgnoreDirectives", getIgnoreDirectives(default_path));

function parse(text) {
  return text
    .split(/\r?\n/m)
    .map(line => line.trim())
    .filter(line => line && line[0] !== "#");
}

module.exports = {
  getIgnoreDirectives
};
