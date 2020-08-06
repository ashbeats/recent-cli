'use strict';

const { existsSync, statSync, readFileSync, writeFileSync } = require("fs");
const humanizeDuration = require("humanize-duration");

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




const RecentIndex = location => () => {
  return existsSync(location)
    ? JSON.parse(readFileSync(location, "utf8")).map(e => e["folderPath"])
    : false;
};

const RecentIndexAge = location => () => {
  if (!existsSync(location)) return false;
  const modTime = new Date(statSync(location)["mtimeMs"]);
  return humanizeDuration(new Date() - modTime, {
    round: true,
    units: ["y", "mo", "w", "d", "h", "m"]
  });
};



const pushd = app => folderPath =>
    writeFileSync(app.Path(".LAST_FOLDER"), folderPath);


module.exports = {
  flatten,
  uniq,
  mapFolderToFormat,
  sort,
  filterExistsSync,
  sortMostRecentDate: sort("mostRecentDate"),
  RecentIndex,
  RecentIndexAge,
  pushd
};
