const { version } = require("../../package.json");
const AppEmitter = require("../setup/emitter.js");
const path = require("path");
const { existsSync, statSync } = require("fs");
const fs = require("fs");

const { dd } = require("dumper.js");

const pipe = require("lodash/fp/pipe.js");
const cliInterface = require("../Cli/interface.js");


// prettier-ignore
const { flatten, uniq, mapFolderToFormat, 
        sortMostRecentDate, filterExistsSync, pushd } = require("./utils.js");
const { RecentIndex, RecentIndexAge } = require("./utils.js");

const {
  databaseWriter,
  rebuildAll,
  addPlugin,
  startCli
} = require("./methods.js");

const pathMaker = top => (internal = "/") => path.join(top, internal);

const cleanupPrior = app => () =>
  fs.existsSync(app.Path(".LAST_FOLDER"))
    ? fs.unlinkSync(app.Path(".LAST_FOLDER"))
    : null;

const App = () => {
  let App = {};

  // #. Props + Meta
  App.version = version;
  App.namespace = "App";
  App.forceRebuild = false;
  App.installedPlugins = []; // just the name

  // #. storage paths, ignore paths
  const p_root = fs.realpathSync(path.join(__dirname, "../../"));
  const p_store = fs.realpathSync(path.join(p_root, "/store/"));
  const p_src = fs.realpathSync(path.join(p_root, "/src/"));

  App.Path = pathMaker(p_root);
  App.PathStore = pathMaker(p_store);
  App.PathSrc = pathMaker(p_src);

  cleanupPrior(App)();

  // @deprecated App.config.dbPath
  App.config = {
    dbPath: p_store, // todo - deprecate this,
    databasePath: App.PathStore("main-db.json")
  };

  App.databaseExists = () => existsSync(App.config.databasePath);
  App.database = RecentIndex(App.config.databasePath);
  App.databaseAge = RecentIndexAge(App.config.databasePath);

  // #. Event Docks
  App.emitter = AppEmitter;

  App.emitter.on("App.PluginInstalled", state =>
    App.installedPlugins.push(state.name)
  );

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

  // # Attach methods
  App.rebuildAll = rebuildAll(App);
  App.add = addPlugin(App);
  App.databaseWriter = databaseWriter(App);
  App.log = console.log;
  App.cliLog = false;

  App.pushd = pushd(App);
  App.cli = cliInterface(App);
  App.start = startCli(App);
  App.loader = routine => routine();

  return App;
};

/** Don't destructure App to maintain reactivity for now */
module.exports = {
  App
};
