module.exports = function (app) {
    
    var self = this;

    self.checkVersion = function (complete) {
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
                console.log('\n ', msg);

                app.prompt.start();
                app.prompt.get([{
                    name: 'upgrade',
                    description: 'Do you want to upgrade from version ' + app.package.version + ' to version ' + package.version + '? (Y/N)',
                    type: 'string',
                    required: true
                }], function (error, response) {
                    if(response.upgrade == 'Y') {
                        self.update(complete);
                    }
                });
                
                return;
            }
    
            if(complete) {
                complete();
            }
        });
    };

    self.update = function (complete) {
        app.alertutils.success('Starting update @etron/cli...');
        app.exec('npm install -g @etron/cli', function(error, stdout, stderr) {
            app.alertutils.error('stdout: ' + stdout);
            app.alertutils.error('stderr: ' + stderr);
            if (error !== null) {
                app.alertutils.error('exec error: ' + error);
            } else {
                app.alertutils.success('@etron/cli updated! =)');
            }

            if(complete) {
                complete();
            }
        });
    };

    return self;
};