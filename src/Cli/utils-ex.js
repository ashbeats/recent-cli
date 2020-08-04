const take = require("lodash/fp/take.js");
// const data = require("./../../store/main-db.json");

// const samples = take(30)(data).map(e => e["folderPath"]);

const humanizeDuration = require("humanize-duration");

const fs = require("fs");
const path = require("path");
const { dd, dump } = require("dumper.js");

const RecentIndex = location => () => {
  return fs.existsSync(location)
    ? JSON.parse(fs.readFileSync(location, "utf8")).map(e => e["folderPath"])
    : false;
};

const RecentIndexAge = location => () => {
  if (!fs.existsSync(location)) return false;
  const modTime = new Date(fs.statSync(location)["mtimeMs"]);
  return humanizeDuration(new Date() - modTime, {
    round: true,
    units: ["y", "mo", "w", "d", "h", "m"]
  });
};

module.exports = { RecentIndex, RecentIndexAge,  };
