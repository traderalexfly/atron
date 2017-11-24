module.exports = function (app) {
    
    var self = this;

    self.info = function (msg) {
        console.log(
            app.chalk.blue(msg)
        );
    };

    self.success = function (msg) {
        console.log(
            app.chalk.green(msg)
        );
    };

    self.error = function (msg) {
        console.log(
            app.chalk.red(msg)
        );
    };

    self.warning = function (msg) {
        console.log(
            app.chalk.yellow(msg)
        );
    };

    return self;
};