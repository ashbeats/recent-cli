const __DEV__ = true;

const { expandAppData } = require("@recent-cli/expand-paths");
const { read_jumplists } = require("./mixins/libs.js");
const pipe = require("lodash/fp/pipe.js");

// # Install
function install(App) {
  const name = "JumpListsPlugin";

  if (App.installedPlugins.includes(name)) throw `Can't install ${name} twice.`;

  const sourcePath = "microsoft/windows/Recent/AutomaticDestinations/";
  const request = App.eventNames.RebuildRequest(name);
  const completion = App.eventNames.RebuildCompletion(name);

  App.emitter.on(request, () => {
    App.emitter.emit(
      completion,
      pipe(
          expandAppData,
          read_jumplists
      )(sourcePath)
    );
  });

  return { name, App };
}

module.exports = {
  install
};
