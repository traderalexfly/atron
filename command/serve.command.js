module.exports = function (app) {
    self = this;
    self.command = '-s';
    self.flag  = '--serve';
    self.description = 'Serve this application.';
    
    self.bootstrap = function() {
        app.updateapputils.checkVersion(() => {
            console.log('Serve Works!');
        });
    }

    return self;
};