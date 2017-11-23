module.exports = function(app) {
  self = this;
  self.command = "-v";
  self.flag = "--v";
  self.description = "Show eTron version.";

  self.bootstrap = function() {
    app.requestify.get('https://raw.githubusercontent.com/inncode/etron/master/package.json')
    .then(function(response) {
        var package = JSON.parse(response.getBody());

        if(package.version !== app.package.version) {
            msg = app.chalk.yellow('Your version (')
                + app.chalk.redBright(app.package.version)
                + app.chalk.yellow(') is outdated. Please run "')
                + app.chalk.blue('npm install -g @etron/cli')
                + app.chalk.yellow('" to upgrade to version (')
                + app.chalk.green(package.version)
                + app.chalk.yellow(').');
        } else {
            msg = app.chalk.green("Your eTron version (" + package.version + ") is up to date. =)");
        }

        console.log('\n ', msg);
    });
  };

  return self;
};