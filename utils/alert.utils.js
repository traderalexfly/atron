module.exports = function (app) {
    
    var self = this;

    /**
     * Display info in color blue on console
     */
    self.info = function (msg) {
        console.log(
            app.chalk.blue(msg)
        );
    };

    /**
     * Display info in color green on console
     */
    self.success = function (msg) {
        console.log(
            app.chalk.green(msg)
        );
    };

    /**
     * Display info in color red on console
     */
    self.error = function (msg) {
        console.log(
            app.chalk.red(msg)
        );
    };

    /**
     * Display info in color yellow on console
     */
    self.warning = function (msg) {
        console.log(
            app.chalk.yellow(msg)
        );
    };

    return self;
};