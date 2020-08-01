const chalk = require("chalk");
const { version } = require("../../../package.json");

const colors = {
  green: chalk.rgb(37, 208, 44),
  yellow: chalk.rgb(250, 255, 42)
};

const menus = {
  // prettier-ignore
  main: 
`
 Recent-cli ${colors.green("v" + version)}
 
 Usage: 
    recent 
  
  ${colors.yellow("Available Options:")}
    -f --force           rebuilds the database index.
    -h --help            opens the documentation page 
`,

  main2: `
    outside [command] <options>

    today .............. show weather for today
    forecast ........... show 10-day weather forecast
    version ............ show package version
    help ............... show help menu for a command`,

  today: `
    outside today <options>

    --location, -l ..... the location to use`,

  forecast: `
    outside forecast <options>

    --location, -l ..... the location to use`
};

module.exports = args => {
  const subCmd = args._[0] === "help" ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main);
};
