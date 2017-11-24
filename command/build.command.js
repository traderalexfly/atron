module.exports = function (app) {
    self = this;
    self.command = '-b';
    self.flag  = '--build';
    self.description = 'Build this application.';
    
    self.bootstrap = function() {
        app.updateapputils.checkVersion(() => {
            console.log('build is not implemented =(');
        });
    }

    return self;
};