#!/usr/bin/env node

var app = {
  requestify  : require('requestify'),
  fs          : require('fs'),
  exec        : require('child_process').exec,
  chalk       : require("chalk"),
  clear       : require("clear"),
  figlet      : require("figlet"),
  git         : require("simple-git/promise"),
  program     : require("commander"),
  prompt      : require("prompt"),
  fileutils   : require("./utils/file.utils")(),
  package     : require("./package.json")
};
app.alertutils = require("./utils/alert.utils")(app),
app.updateapputils = require("./utils/update-app.utils")(app),

app.program.name('etron').version(app.package.version);

// Show the name and version for etron.
app.clear();
console.log(
  app.chalk.bold.redBright(
    app.figlet.textSync("eTron", { horizontalLayout: "full" })
  ),
  app.chalk.yellowBright(app.package.version)
);

var files = app.fileutils._getAllFilesFromFolder(__dirname + "/command/");

/**
 * populate options for program
 */
for (let i = 0; i < files.length; i++) {
  try {
    var memCo = require(files[i])(app);
    app.program.option(memCo.command + ", " + memCo.flag, memCo.description);
  } catch (e) {
    console.log(app.chalk.red("Erro: " + e));
  }
}

// parse - argv
app.program.parse(process.argv);

//bootstrap for command
for (let i = 0; i < files.length; i++) {
  var memCo = require(files[i])(app);
  let fu = eval("app.program." + memCo.flag.replace("--", ""));
  if (fu) {
    memCo.bootstrap();
    return;
  }
}

//case not say command, show the options
if (!app.program.args.length) {
  app.program.help();
}