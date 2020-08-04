// prettier-ignore
module.exports = {    
    intro: "Quickly Jump to Windows 10 system-wide recent folders on the CLI",
    usage: "Usage: recent.exe [command]",
    
    commandsTitle: "Available Commands:",
    commands: [
        // "rebuild     Quickly rebuild your recent folder index",
        // "list        List recent folders",
        // "help        Show help online",
        {value: "list",  desc: "List recent folders" },
        {value: "rebuild",  desc: "Quickly rebuild your recent folder index" },
        {value: "help",  desc: "Show online help" },
        {value: "exit",  desc: "Exits recent cli" },
    ]
    
    
};
