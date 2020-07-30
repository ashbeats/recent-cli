"use strict";
const path = require("path");
const fs = require("fs");

const databaseWriter = app => sourceName => {
  const filename = path.join(app.config.dbPath, `${sourceName}.json`);
  if (!fs.realpathSync(filename)) {
    throw "Unable to write to " + filename;
  }
  return data => {
    fs.writeFileSync(filename, JSON.stringify(data));
    return data;
  };
};

const rebuildAll = app => _ => {
  const _getEvtName = app.eventNames.RebuildCompletion;
  let todo = app.installedPlugins.length;
  let stack = [];
  app.installedPlugins.forEach(name => {
    app.emitter.on(_getEvtName(name), data => {
      todo--;
      stack.push(data);
      if (todo === 0) {
        app.emitter.emit("App.MergeData", stack);
      }
    });
    app.emitter.emit(app.eventNames.RebuildRequest(name));
  });
};

const addPlugin = app => plugin => {
  app.emitter.emit("App.PluginInstalled", plugin.install(app));
};

module.exports = { databaseWriter, rebuildAll, addPlugin };
