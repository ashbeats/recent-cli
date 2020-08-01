const { dd, dump } = require("dumper.js");
const { version } = require("../../package.json");
const chalk = require("chalk");
const colors = {
  g: chalk.greenBright,
  y: chalk.yellowBright
};

const { g, y } = colors;

// const g = o => o;
// const y = o => o;

const fs = require("fs");
const { expandUserPath } = require("@recent-cli/expand-paths");
const ignoreFileLocation = expandUserPath(".recentignore", false);

/*
const cliProgress = require("cli-progress");

const b1 = new cliProgress.SingleBar({
  format:
    "CLI Progress |" +
    "{bar}" +
    "| {percentage}% || {value}/{total} Chunks || Speed: {speed}",
  barCompleteChar: "\u2588",
  barIncompleteChar: "\u2591",
  hideCursor: true
});

// initialize the bar - defining payload token "speed" with the default value "N/A"
b1.start(200, 0, {
  speed: "N/A"
});
*/

const { ColorCommand } = require("./ColorCommand.js");
const program = new ColorCommand();

console.log("");

program
  .passCommandToAction(false)
  .name("recent")
  .description("Jump to Windows 10 system-wide recent folders on the CLI.")
  .option(g("-f, --force"), "Quickly rebuild your recent folder index", false);

/*
todo: Use commander, for basic arg management. Hook help to display your own static menu. 
    
    rebuild - progress bar
    list - use inquirer. 
    
    available commmands section should be navigatable  
   
 */

// https://github.com/SBoudrias/Inquirer.js
const inquirer = require("inquirer");
const txts = require("./logo.js");

const uiBar = new inquirer.ui.BottomBar();

program.action(args => {
  // if(!args.exclude) args.exclude = ignoreFileLocation;
  if (args.force) "rebuild";

  // Building initial menu.
  console.log(txts.logo);
  console.log("");
  console.log(txts.intro);
  console.log("");

  const folders = {
    type: "list",
    loop: true,
    name: "selectedCommand",
    message: txts.commandsTitle + "\n",
    choices: previous => {
      /// i want  artisan style help, but navigatable
      return txts.commands.map((o, i) => {        
        let displayLine = o.value.toString().padEnd(10, " ");        
        displayLine = g(displayLine);        
        displayLine += y(o.desc);        
        return { name: displayLine, value: o.value };
      });
    }
  };

  inquirer.prompt(folders).then(answers => {
    // ui.updateBottomBar('new bottom bar content');
    
    console.log(JSON.stringify(answers, null, "  "));
  });

  if (false) {
    program.outputHelp(c => {
      return c;
      return "This is my custom help screen";
    });
  }
});
//

program.parse(process.argv);
