module.exports = function (app) {
    self = this;
    self.command = '-b';
    self.flag  = '--build';
    self.description = 'Build this application.';
    
    self.bootstrap = function() {
        console.log('Build Works!');
    }

    return self;
};