const { readdirSync, readFileSync } = require("fs");
const pipe = require("lodash/fp/pipe.js");
const path = require("path");
const { dirname } = require("path");
const { dd } = require("dumper.js");

const {
  automatic_destination_parser
} = require("@recent-cli/jumplist-parser-lite");

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

const pipeLine = [
  getPathsTo("automaticDestinations-ms"),
  function(files) {
    // const
    const allpaths = [
      ...new Set(
        files
          .map(file => {
            return automatic_destination_parser(readFileSync(file));
          })
          .filter(e => e)
          .map(e => {
            return e.map(dirname);
          })
          .reduce((p, v) => {
            p = [...p, ...v];
            return p;
          }, [])
      )
    ];

    return allpaths;
  }
];

module.exports = {
  read_jumplists: pipe(...pipeLine)
};
