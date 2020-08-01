const inquirer = require("inquirer");
const fs = require("fs");
const take = require("lodash/fp/take.js");

const data = require("../../recent-cli/store/main-db.json");

// const stats = new Date(fs.statSync('../../recent-cli/store/main-db.json')['mtimeMs']);

const samples = take(30)(data).map(e => e["folderPath"]);

console.log(`

Usage: recent [options]

Once you select a folder, use popd to return to the current folder. 


  -f, --force    Quickly rebuild your recent folder index (default: false)`);

// ui.log.write('Almost over, standby!');

// During processing, update the bottom bar content to display a loader
// or output a progress bar, etc
// ui.updateBottomBar('new bottom bar content');
const menu = {
  type: "expand",
  message: "Recent Folder Explorer. Press ENTER to see options",
  name: "overwrite",
  choices: [
    {
      key: "r",
      name: "Rebuild the index",
      value: "rebuild"
    },
    {
      key: "a",
      name: "Show recent folders",
      value: "list"
    },
    new inquirer.Separator(),
    {
      key: "x",
      name: "Abort",
      value: "abort"
    }
  ]
};
const folders = {
  type: "list",
  loop: false,
  name: "folder",
  message: "Choose a folder",
  choices: (previous) => {
      console.log('prev', previous)
      if(previous.opt === "Rebuild index"){
          console.log('Rebuilding....')
      }else{
          return samples    
      }
      
  }
};

const begin = {
  type: "list",
  loop: false,
  name: "opt",
  message: "Choose an action",
  choices: [
      "List recent folders", 
      "Rebuild index",      
      "Show help"
  ]
};

const close = {
    
    
}

inquirer.prompt([begin, folders]).then(answers => {
  console.log(JSON.stringify(answers, null, "  "));
});
