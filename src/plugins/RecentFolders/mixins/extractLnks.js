const Lnk = require("@recent-cli/resolve-lnk");
const { existsSync, readFileSync, statSync } = require("fs");
const { dirname } = require("path");
const pipe = require("lodash/fp/pipe.js");

const safe_pipe = (...fns) => {
  try {
    return pipe(...fns);
  } catch (e) {
    return undefined;
  }
};


const pipeline = safe_pipe(readFileSync, Lnk["resolveBuffer"], dirname);
/**
 *
 * @param files
 * @returns {*}
 */
const extractLnks = fn_filter => files => {   
  //return [...new Set(files.map(fn_filter).filter(e => e))];

  return [
    ...new Set(
      files
        .map(e => {
          try {
            return dirname(Lnk.resolveBuffer(readFileSync(e)));
          } catch (e) {
            // unsupported lnks.
          }
        })
        .filter(e => e)
    )
  ];
};

module.exports = {
  extractLnks: extractLnks(pipeline)
};
