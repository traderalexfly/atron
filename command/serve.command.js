module.exports = function (app) {
    self = this;
    self.command = '-s';
    self.flag  = '--serve';
    self.description = 'Serve this application.';
    
    self.bootstrap = function() {
        console.log('Serve Works!');
    }

    return self;
};