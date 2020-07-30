const { version } = require("../../package.json");
const AppEmitter = require("../setup/emitter.js");
const path = require("path");
const { existsSync, statSync } = require("fs");
const fs = require("fs");

const { dd } = require("dumper.js");

const pipe = require("lodash/fp/pipe.js");

// prettier-ignore
const { flatten, uniq, mapFolderToFormat, 
        sortMostRecentDate, filterExistsSync } = require("./utils.js");
const { databaseWriter, rebuildAll, addPlugin } = require("./methods.js");

const App = _ => {
  let App = {};

  // #. Props + Meta
  App.version = version;
  App.namespace = "App";
  App.forceRebuild = false;
  App.installedPlugins = []; // just the name

  // #. storage paths, ignore paths
  App.config = {
    dbPath: path.join(__dirname, "../../store/")
  };

  // #. Event Docks
  App.emitter = AppEmitter;

  App.emitter.on("App.PluginInstalled", state => {
    App.installedPlugins.push(state.name);
  });

  const mergePipeline = pipe(
    flatten,
    uniq,
    filterExistsSync,
    mapFolderToFormat,
    sortMostRecentDate,
    databaseWriter(App)("main-db"),
    d => App.emitter.emit("App.DatabaseReady", d)
  );

  App.emitter.on("App.MergeData", mergePipeline);
   
  App.eventNames = {
    RebuildCompletion: name => `${name}.onRebuildCompletion`,
    RebuildRequest: name => `${name}.onRebuildRequested`
  };

  // # Attach methods.js
  App.rebuildAll = rebuildAll(App);
  App.add = addPlugin(App);
  App.databaseWriter = databaseWriter(App);

  App.start = () => {};
  App.getData = () => {};

  return App;
};

module.exports = {
  App
};
