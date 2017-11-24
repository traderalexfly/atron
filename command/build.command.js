module.exports = function (app) {
    self = this;
    self.command = 'b';
    self.flag  = 'build';
    self.description = 'build this application';
    
    /**
     * Bootstrap for build command.
     */
    self.bootstrap = function() {
        app.updateapputils.checkVersion(() => {
            console.log('build is not implemented =(');
        });
    }

    return self;
};