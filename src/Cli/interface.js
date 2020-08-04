"use strict";

const inquirer = require("inquirer"); // https://github.com/SBoudrias/Inquirer.js
const rxjs = require("rxjs"); // https://github.com/ReactiveX/rxjs

const searchListPrompt = require("inquirer-search-list");

const { logo } = require("./resource/logo.js");
const lang = require("./resource/lang-en.js");
const { cmd_menu, cmd_folders } = require("./screens/menu.js");

function main(App) {
  
  function print_HelpMenu() {
    console.clear();
    process.stdout.write("\u001b[2J\u001b[0;0H");
    console.log(logo);
    console.log("");
    console.log(lang.intro);
    console.log("Database Age: ", App.databaseAge());
    console.log("");
  }


  function showMenu(menu) {
    process.stdout.write("\u001b[2J\u001b[0;0H");
    print_PlainMenu();
    const prompts = create_prompt();
    prompts.next(menu);
  }

  const ui_result_handler = ({ uiBar, prompts }) => result => {
    // console.log("result", result);
    // { name: 'selectedCommand', answer: 'list' }
    // console.log(result);
    // { name: 'folder', answer: 'C:\\' }
    if (result.name === "folder") {
      App.pushd(result.answer)
      prompts.complete();
      // process.exit(0);
      return;
    };
    
    if (result.name !== "selectedCommand") return;
    switch (result.answer) {
      case "list":
        // allow search autocomplete
        showMenu({
          type: "search-list",
          loop: false,
          name: "folder",
          message: "Choose a folder",
          choices: App.database()
        });
        break;

      case "rebuild":
        App.start(true);
        break;

      case "help":
        prompts.complete();
        break;

      case "exit":
        prompts.complete();
        break;

      default:
        break;
    }
  };

  function create_prompt(userCommand) {
    const prompts = new rxjs.Subject();
    let uiBar = new inquirer.ui.BottomBar();

    App.cliLog = msg => uiBar.updateBottomBar(msg + "\n");

    const uiPrompter = inquirer.createPromptModule();
    uiPrompter.registerPrompt("search-list", searchListPrompt);
    uiPrompter(prompts).ui.process.subscribe(
      ui_result_handler({ prompts, uiBar }),
      error => {
        console.error(error);
      },
      () => {
       // todo -- on complete
      }
    );

    return prompts;
  }

  showMenu(cmd_menu(App.databaseExists()));
}

const cleanUp = type => () => {
  console.clear();

  console.log("Event:", type, "received\n\n\n\n\n");
};

// [
//   `exit`,
//   `SIGINT`,
//   `SIGUSR1`,
//   `SIGUSR2`,
//   `uncaughtException`,
//   `SIGTERM`
// ].forEach(eventType => {
//   process.on(eventType, cleanUp(eventType));
// });

module.exports = app => main;
