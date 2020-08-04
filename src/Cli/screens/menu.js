const { primary, secondary } = require("../style/colors.js");

const lang = require("../resource/lang-en.js");

const cmd_menu = db_exists => {
  let items = db_exists
    ? lang.commands
    : lang.commands.filter(e => e.value !== "list");

  return {
    type: "list",
    loop: true,
    name: "selectedCommand",
    message: lang.commandsTitle + "\n",
    askAnswered: true,
    choices: previous => {
      return items.map((o, i) => {
        let displayLine = o.value.toString().padEnd(10, " ");
        displayLine = primary(displayLine);
        displayLine += secondary(o.desc);
        return { name: displayLine, value: o.value };
      });
    }
  };
};

const cmd_folders = fn_dataset => ({
  type: "search-list",
  loop: false,
  name: "folder",
  message: "Choose a folder",
  choices: fn_dataset
});

module.exports = {
  cmd_menu,
  cmd_folders
};
