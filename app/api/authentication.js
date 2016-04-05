var mysql = require('mysql');
var fs = require('fs');
var db = require(__base + 'config/database');
var config = require(__base + 'config/local_config');

module.exports = function (app) {    
    app.post('/api/authentication/login', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT id, full_name, role FROM user WHERE username = ? AND password = ?', [req.body.username, req.body.passwd], function (err, rows) {
                    console.log(rows);
                    connection.destroy();
                    pool.end();
                    res.json(rows);
                });
            }
        });
    });
};