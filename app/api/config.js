var fs = require('fs');
var config = require(__base + 'config/local_config');

module.exports = function (app) {
    app.post('/api/config/get_config', function (req, res) {
        fs.readFile(config.config_path, function (err, data) {
            if (err) {
                res.json({});
            } else {
                res.json(JSON.parse(data));
            }
        });
    });

    app.post('/api/config/load_home_config', function (req, res) {
        fs.readFile(config.home_config_path, function (err, data) {
            if (err) {
                res.json({});
            } else {
                res.json(JSON.parse(data));
            }
        });
    });

    app.post('/api/config/load_blocks_config', function (req, res) {
        fs.readFile(config.blocks_config_path, function (err, data) {
            if (err) {
                res.json({});
            } else {
                res.json(JSON.parse(data));
            }
        });
    });
};