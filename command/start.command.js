module.exports = function (app) {
    self = this;
    self.command = '-c';
    self.flag  = '--create';
    self.description = 'start the new application';
    
    self.bootstrap = function() {

        console.log('\n ');
        
        app.prompt.start();

        app.prompt.get([{
            name: 'project_name',
            description: 'Project name',
            type: 'string',
            required: true
        }], function (error, result) {
            
            var name = result.project_name;
            var formated_name = name.toLocaleLowerCase().split(' ').join('-');

            if (!app.fs.existsSync(formated_name)){
                app.alertutils.success("Creating folder " + formated_name + "...");                
                app.fs.mkdirSync(formated_name);

                self.cloneStartApplication(formated_name);
            } else {
                app.alertutils.error("Folder " + formated_name + ", exists!");
            }

        });

    }

    self.cloneStartApplication = function (folder) {
        app.alertutils.success("Creating project...");
        app.git()
            .silent(true)
            .clone('https://github.com/inncode/etron-base-application.git', folder)
            .then(() => app.alertutils.success("finished..."))
            .catch((err) => {
                
                if (app.fs.existsSync(folder))
                    app.fs.rmdirSync(folder);

                app.alertutils.error('failed: ' + err);
            });
    }

    return self;
};