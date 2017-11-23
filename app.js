#!/usr/bin/env node
var app = {
  chalk: require("chalk"),
  clear: require("clear"),
  figlet: require("figlet"),
  program: require("commander"),
  co: require("co"),
  fileutils: require("./utils/file.utils")(),
  prompt: require("co-prompt")
};

var pjson = require("./package.json");

app.clear();
console.log(
  app.chalk.bold.redBright(
    app.figlet.textSync("eTron", { horizontalLayout: "full" })
  ),
  app.chalk.bold.yellowBright(pjson.version)
);

var files = app.fileutils._getAllFilesFromFolder(__dirname + "/command/");

for (let i = 0; i < files.length; i++) {
  try {
    var memCo = require(files[i])(app);
    app.program.option(memCo.command + ", " + memCo.flag, memCo.description);
  } catch (e) {
    console.log(app.chalk.red("Erro: " + e));
  }
}

app.program.parse(process.argv);

//bootstrap do comando.
for (let i = 0; i < files.length; i++) {
  var memCo = require(files[i])(app);
  let fu = eval("app.program." + memCo.flag.replace("--", ""));
  if (fu) {
    memCo.bootstrap();
    return;
  }
}

//caso não digite nenhum opção eu mostro o helper
if (!app.program.args.length) {
  app.program.help();
}