"use strict";

const { readdirSync } = require("fs");
const pipe = require("lodash/fp/pipe.js");
const path = require("path");
const { extractLnks } = require("./extractLnks.js");

/**
 * get full paths to lnk files in folder.
 * 
 * @param extensions
 * @returns {function(*=): string[]}
 */
const getPathsTo = extensions => inFolder => {
  return readdirSync(inFolder)
    .filter(f => f.endsWith(extensions))
    .map(f => path.join(inFolder, f));
};

const pipeLine = [getPathsTo("lnk"), extractLnks];

module.exports = {
  read_folder_lnks: pipe(...pipeLine)
};
