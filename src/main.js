const { App } = require("./App/App.js");
const RecentFoldersPlugin = require("./plugins/RecentFolders/RecentFolders.js");
const Jumplists = require("./plugins/Jumplists/Jumplists.js");
const { dd, dump } = require("dumper.js");


// const ignores = require("./ignores.js")
/**

 Things I need to prep before the Product Meeting
 ====
 
 - web-cam (Easier to get a web-cam than replacing the hp led screen)
 - Resume  
 - 
 
 
 
 
 
 * @type {{}}
 */
let recent = App({});

// Hook up your plugins.
recent.add(RecentFoldersPlugin);
recent.add(Jumplists);

rebuild = true;

if (rebuild) {
  recent.emitter.on("App.DatabaseReady", function(d) {
    dd(d);
  });

  recent.rebuildAll();
}

function Create(options) {
  /*  db.dispatchRelay = (data_collected, channelName) => incomingData => {
    // all scrapers completed.
  }; */
  // let cli = new RecentCli();
  // cli.add(db);
  // cli.interface(new RecentInterface());
  // cli.begin();
  // return manager;
}
