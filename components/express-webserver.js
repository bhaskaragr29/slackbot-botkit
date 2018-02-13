'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('botkit:webserver');

/**
 * The express webserver
 * default port will be 3000
 * @param  {Object} controller Botkit Controller
 * @return {Object}          webserer
 */
module.exports = function(controller, port = 3000) {
    const webserver = express();

    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));
    webserver.use(express.static('public'));

    webserver.listen(port, null, function() {
        debug('Express webserver configured and listening at http://localhost:' + process.env.PORT || 3000);
    });

    // import all the pre-defined routes that are present in /components/routes
    require("fs").readdirSync(require("path").join(__dirname, "routes")).forEach(function(file) {
      require("./routes/" + file)(webserver, controller);
    });

    controller.webserver = webserver;

    return webserver;
}
