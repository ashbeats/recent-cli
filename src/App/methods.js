"use strict";
const path = require("path");
const fs = require("fs");

const databaseWriter = app => sourceName => {
  app.emitter.emit("App.Log", `Writing ${sourceName}`);
  return data => {
    fs.writeFileSync(app.PathStore(`${sourceName}.json`), JSON.stringify(data));
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
      app.emitter.emit("App.Log", `Collected ${name}`);
      if (todo === 0) {
        app.emitter.emit("App.MergeData", stack);
      }
    });
    app.emitter.emit(app.eventNames.RebuildRequest(name));
    app.emitter.emit("App.Log", `Rebuilding ${name}`);
  });
};


const addPlugin = app => plugin =>
  app.emitter.emit("App.PluginInstalled", plugin.install(app));

const startCli = app => force => {
  if (force || !app.databaseExists()) {
    const logger = !app.cliLog ? app.log : app.cliLog;
    app.emitter.on("App.Log", logger);
    app.emitter.on("App.DatabaseReady", d => app.cli(app));
    app.rebuildAll();
  } else {
    app.cli(app);
  }
};

module.exports = { databaseWriter, rebuildAll, addPlugin, startCli };
 