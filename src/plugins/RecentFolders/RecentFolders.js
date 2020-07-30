const __DEV__ = true;

const { expandUserPath }   = require("@recent-cli/expand-paths");
const { read_folder_lnks } = require("./mixins/libs.js");
const pipe                 = require("lodash/fp/pipe.js");

// # Install
function install(App) {
  const name = "RecentFoldersPlugin";

  if (App.installedPlugins.includes(name)) throw `Can't install ${name} twice.`;

  const sourcePath = "AppData/Roaming/Microsoft/Windows/Recent/";
  const request = App.eventNames.RebuildRequest(name);
  const completion = App.eventNames.RebuildCompletion(name);

  App.emitter.on(request, () => {
    App.emitter.emit(
      completion,
      pipe(
        expandUserPath,
        read_folder_lnks
      )(sourcePath)
    );
  });

  return { name, App };
}

module.exports = {
  install
};
