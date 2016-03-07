var mysql = require('mysql');
var db = require('../../../config/database');

module.exports = function (app) {
    app.post('/api/admin/categories', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT * FROM category', [], function (err, rows) {
                    res.json(rows);
                    connection.destroy();
                    pool.end();
                });
            }
        });
    });
    
    app.post('/api/admin/subcategories', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT sub_category.*, count(0) as post_count FROM sub_category LEFT JOIN post ON post.sub_category_id = sub_category.id WHERE sub_category.category_id = ? GROUP BY sub_category.id', req.body.category_id, function (err, rows) {
                    res.json(rows);
                    connection.destroy();
                    pool.end();
                });
            }
        });
    });
    
    app.post('/api/admin/update_subcategory', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                var queries = 0;
                
                function callBack(conn) {
                    conn.query('SELECT sub_category.*, count(0) as post_count FROM sub_category LEFT JOIN post ON post.sub_category_id = sub_category.id WHERE sub_category.category_id = ? GROUP BY sub_category.id', req.body.category_id, function (err, rows) {
                        res.json(rows);
                        conn.destroy();
                        pool.end();
                    });
                }

                //Insert
                if (req.body.adds.length > 0) {
                    req.body.adds.forEach(function (subCategory) {
                        console.log(queries++);
                        connection.query('INSERT INTO sub_category SET ?', { name: subCategory.name, slug: subCategory.slug, category_id: req.body.id }, function (err, result) {
                            if (0 === --queries) {
                                callBack(connection);
                            }
                        });
                    });
                }
                
                //Update
                if (req.body.updates.length > 0) {
                    req.body.updates.forEach(function (subCategory) {
                        console.log(queries++);
                        connection.query('UPDATE sub_category SET ? WHERE ?', [{ name: subCategory.name, slug: subCategory.slug, category_id: req.body.id }, { id: subCategory.id }], function (err, result) {
                            if (0 === --queries) {
                                callBack(connection);
                            }
                        });
                    });
                }
                
                //Delete
                if (req.body.deletes.length > 0) {
                    req.body.deletes.forEach(function (subCategory) {
                        console.log(queries++);
                        connection.query('DELETE FROM sub_category WHERE ?', { id: subCategory.id }, function (err, result) {
                            if (0 === --queries) {
                                callBack(connection);
                            }
                        });
                    });
                }
            }
        });
    });

    app.post('/api/admin/update_category', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                var queries = 0;
                
                function callBack(conn) {
                    conn.query('SELECT * FROM category', [], function (err, rows) {
                        res.json(rows);
                        conn.destroy();
                        pool.end();
                    });
                }
                
                //Insert
                if (req.body.adds.length > 0) {
                    req.body.adds.forEach(function (category) {
                        console.log(queries++);
                        connection.query('INSERT INTO category SET ?', { name: subCategory.name, slug: subCategory.slug}, function (err, result) {
                            if (0 === --queries) {
                                callBack(connection);
                            }
                        });
                    });
                }
                
                //Update
                if (req.body.updates.length > 0) {
                    req.body.updates.forEach(function (category) {
                        console.log(queries++);
                        connection.query('UPDATE category SET ? WHERE ?', [{ name: category.name, slug: category.slug }, { id: category.id }], function (err, result) {
                            if (0 === --queries) {
                                callBack(connection);
                            }
                        });
                    });
                }
                
                //Delete
                if (req.body.deletes.length > 0) {
                    req.body.deletes.forEach(function (category) {
                        console.log(queries++);
                        connection.query('DELETE FROM category WHERE ?', { id: category.id }, function (err, result) {
                            if (0 === --queries) {
                                callBack(connection);
                            }
                        });
                    });
                }
            }
        });
    });
};