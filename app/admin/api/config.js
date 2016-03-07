var fs = require('fs');
var config = require(__base + 'config/local_config');

module.exports = function (app) {
    app.post('/api/admin/config/save', function (req, res) {
        fs.writeFile(config.config_path, JSON.stringify(req.body), { flag: 'w' }, function (err) {
            if (err) {
                res.json({ err: -1, message: err.message });
            } else {
                res.json({ err: 0 });
            }
        });
    });
    app.post('/api/admin/config/save_home', function (req, res) {
        fs.writeFile(config.home_config_path, JSON.stringify(req.body.home_config), { flag: 'w' }, function (err) {
            if (err) {
                res.json({ err: -1, message: err.message });
            } else {
                res.json({ err: 0 });
            }
        });
    });
};