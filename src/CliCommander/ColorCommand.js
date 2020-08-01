const { Command } = require("commander");
const chalk = require("chalk");
const colors = {
  g: chalk.rgb(37, 208, 44),
  y: chalk.rgb(250, 255, 42)
};

const { g, y } = colors;

class ColorCommand extends Command {
  helpInformation() {
    let desc = [];
    if (this._description) {
      desc = [this._description, ""];

      const argsDescription = this._argsDescription;
      if (argsDescription && this._args.length) {
        const width = this.padWidth();
        const columns = process.stdout.columns || 80;
        const descriptionWidth = columns - width - 5;
        desc.push("Arguments:");
        desc.push("");
        this._args.forEach(arg => {
          desc.push(
            "  " +
              g(pad(arg.name, width)) +
              "  " +
              wrap(argsDescription[arg.name], descriptionWidth, width + 4)
          );
        });
        desc.push("");
      }
    }

    let cmdName = this._name;
    if (this._aliases[0]) {
      cmdName = cmdName + "|" + this._aliases[0];
    }
    let parentCmdNames = "";
    for (let parentCmd = this.parent; parentCmd; parentCmd = parentCmd.parent) {
      parentCmdNames = parentCmd.name() + " " + parentCmdNames;
    }
    const usage = [
      "Usage: " + g(parentCmdNames + cmdName + " " + this.usage()),
      ""
    ];

    let cmds = [];
    const commandHelp = this.commandHelp();
    if (commandHelp) cmds = [commandHelp];

    const options = [
      y("Options:"),
      "" + g(this.optionHelp().replace(/^/gm, "  ")),
      ""
    ];

    // #. Return un-opinionated values. Let user decide.
    
    const logo = [
        `
  ██████╗ ███████╗ ██████╗███████╗███╗   ██╗████████╗     ██████╗██╗     ██╗
  ██╔══██╗██╔════╝██╔════╝██╔════╝████╗  ██║╚══██╔══╝    ██╔════╝██║     ██║
  ██████╔╝█████╗  ██║     █████╗  ██╔██╗ ██║   ██║       ██║     ██║     ██║
  ██╔══██╗██╔══╝  ██║     ██╔══╝  ██║╚██╗██║   ██║       ██║     ██║     ██║
  ██║  ██║███████╗╚██████╗███████╗██║ ╚████║   ██║       ╚██████╗███████╗██║
  ╚═╝  ╚═╝╚══════╝ ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝        ╚═════╝╚══════╝╚═╝
        `
    ];
    
    return logo
        
      .concat(usage)
      .concat(desc)
      .concat(options)
      .concat(cmds)
      .join("\n");
  }
}

module.exports = {
  ColorCommand
};
