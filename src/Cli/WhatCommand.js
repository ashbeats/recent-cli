"use strict";

const minimist = require("minimist");

function whatCommand(args_raw) {
  const { _: args } = minimist(args_raw);

  const allowed_commands = ["rebuild", "list", "ls", "help"];

  // prettier-ignore
  const commandsGiven = [
        ...new Set(
            args.map(a => a.toString().trim().toLowerCase()).filter(a => allowed_commands.includes(a))
        )
    ];

  let cmd = "menu";
  if (commandsGiven.length > 0) {
    if ("rebuild" === commandsGiven[0]) cmd = "rebuild";
    if ("list" === commandsGiven[0] || "ls" === commandsGiven[0]) cmd = "list";
    if ("help" === commandsGiven[0]) cmd = "menu";
  }

  return cmd;
}

module.exports = {
  whatCommand
};
