const { existsSync, statSync } = require("fs");

function flatten(o) {
  return o.reduce((p, v) => {
    p = [...p, ...v];
    return p;
  }, []);
}

function uniq(arr) {
  return [...new Set(arr)];
}


function filterExistsSync(o) {
  return o.filter(existsSync);
}

function sort(key) {
  return o => o.sort((a, b) => b[key] - a[key]);
}

function mapFolderToFormat(o) {
  return o.map(e => ({
    folderPath: e,
    mostRecentDate: new Date(statSync(e)["atimeMs"])
  }));
}

module.exports = {
  flatten,
  uniq,
  mapFolderToFormat,
  sort,
  filterExistsSync,
  sortMostRecentDate: sort("mostRecentDate")
};
