var bunyan = require('bunyan');
module.exports = function () {


    var logger = bunyan.createLogger({
        name    : 'uxboard',
        streams : [
            {
                //TODO: Change to info in production
                level  : 'debug',
                stream : process.stdout
            },
            {
                type   : 'rotating-file',
                level  : 'debug',
                path   : "log/debug.log",
                period : '1d',   // daily rotation
                count  : 3
            },
            {
                type   : 'rotating-file',
                path   : 'log/error.log',
                period : '1d',   // daily rotation
                count  : 3,       // keep 3 back copies,
                level  : 'error'
            }
        ]
    });

    process.on('uncaughtException', function (err) {
        logger.error({error : err}, "Uncaught Exception");
    });

    return logger;

}();
