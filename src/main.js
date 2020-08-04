const { App } = require("./App/App.js");
const RecentFoldersPlugin = require("./plugins/RecentFolders/RecentFolders.js");
const Jumplists = require("./plugins/Jumplists/Jumplists.js");
const { dd, dump } = require("dumper.js");

const fs = require("fs");

process.on("exit", function(code) {});

const { whatCommand } = require("./WhatCommand.js");
const args = process.argv;

try {
  let recent = App(args);

  // Hook up your plugins.
  recent.add(RecentFoldersPlugin);
  recent.add(Jumplists);
  recent.start( false);
} catch (e) {
  console.error(e);
}
