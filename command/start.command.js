module.exports = function (app) {
    self = this;
    self.command = '-c';
    self.flag  = '--create';
    self.description = 'Start the new application.';
    
    self.bootstrap = function() {
        console.log('Start Works!');
    }

    return self;
};