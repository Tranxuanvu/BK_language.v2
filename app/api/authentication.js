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
                connection.query('SELECT * FROM user WHERE email = ? AND password = ? AND role = 0', [req.body.email, req.body.password], function (err, rows) {
                    connection.destroy();
                    pool.end();
                    res.json(rows);
                });
            }
        });
    });

    app.post('/api/authentication/register', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                var data = {
                    email: req.body.email,
                    phone_number: req.body.phoneNumber,
                    full_name: req.body.fullName,
                    password: req.body.password,
                    school_company: req.body.schoolCompany
                }

                /*  1: trung email
                    4: insert du lieu thanh cong
                */
                connection.query('SELECT * FROM user WHERE user.role = 0', function (err,rows) {
                    var result = [];
                    for (var i = 0; i < rows.length; i++) {
                        result[i] = rows[i].email;
                    }

                    if (checkDuplicate(data.email, result)) {
                        connection.destroy();
                        pool.end();
                        res.json("1");
                    } else {
                        connection.query('INSERT INTO user SET ?', data, function (err, rows) {
                            connection.destroy();
                            pool.end();
                            res.json("4");
                        });
                    }
                });
            }
        });
    });

    function checkDuplicate(data, array) {
        for (i in array) {
            if(array[i] == data){
                return true;
            }
            else return false;
        }
    }
};
