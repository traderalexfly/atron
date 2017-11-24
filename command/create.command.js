module.exports = function (app) {
    self = this;
    self.command = 'c';
    self.flag  = 'create';
    self.description = 'create the new application';
    
    /**
     * Bootstrap for create command.
     */
    self.bootstrap = function() {

        app.updateapputils.checkVersion(() => {
            
            console.log('\n ');

            if(process.argv[3]) {
                self.createApp(process.argv[3]);
            } else {

                app.prompt.start();

                app.prompt.get([{
                    name: 'project_name',
                    description: 'Project name',
                    type: 'string',
                    required: true
                }], function (error, result) {
                    self.createApp(result.project_name);
                });
            }
        });
    }

    /**
     * Create structure and download the base application
     * @param {*} folder 
     */
    self.createApp = function (name) {
        
        var formated_name = name.toLocaleLowerCase().split(' ').join('-');
        if (!app.fs.existsSync(formated_name)){
            app.alertutils.success("Creating folder " + formated_name + "...");                
            app.fs.mkdirSync(formated_name);

            self.cloneStartApplication(formated_name);
        } else {
            app.alertutils.error("Folder " + formated_name + ", exists!");
        }
        
    }

    /**
     * Clone the base application
     * @param {*} folder 
     */
    self.cloneStartApplication = function (folder) {
        app.alertutils.success("Creating project...");
        app.git()
            .silent(true)
            .clone('https://github.com/inncode/etron-base-application.git', folder)
            .then(() => app.alertutils.success("Finished..."))
            .catch((err) => {
                
                if (app.fs.existsSync(folder))
                    app.fs.rmdirSync(folder);

                app.alertutils.error('Failed: ' + err);
            });
    }

    return self;
};