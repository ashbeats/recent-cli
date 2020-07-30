const Lnk = require("@recent-cli/resolve-lnk");
const { existsSync, readFileSync, statSync } = require("fs");
const { dirname } = require("path");

/**
 *
 * @param files
 * @returns {*}
 */
function extractLnks(files) {
  let index = new Set();
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
}

module.exports = {
  extractLnks
};
