var mysql = require('mysql');
var fs = require('fs');
var db = require(__base + 'config/database');
var config = require(__base + 'config/local_config');

module.exports = function (app) {
    app.post('/api/main/getpost', function (req, res) {
        
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT post.image_url, post.title, post.discription, category_id.slug AS menu_slug, post.slug AS post_slug FROM post, category, menu WHERE post.status_id = 3 AND post.on_page = 1 AND post.category_id = category_id.id AND category.id = ?', req.body.id, function (err, rows) {
                    connection.destroy();
                    pool.end();
                    
                    var result = [];
                    rows.forEach(function (e) {
                        result.push({
                            image_url: e.image_url,
                            title: e.title,
                            href: '/' + e.menu_slug + '/' + e.post_slug,
                            discription: e.discription

                        });
                    });
                    
                    res.json(result);
                });
            }
        })
    });
    
    app.post('/api/main/new_customer', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                
                var data = {
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    status: req.body.status,
                    wish: req.body.wish,
                    create_at: new Date()
                }
                
                connection.query('INSERT INTO customer SET ?', data);
                
                res.json({});
            }
        })
    });
    
    app.post('/api/main/menu', function (req, res) {
        if (req.body.menu_id != null) {
            fs.exists(config.menu_cache_path, function (exsist) {
                if (!exsist) {
                    try {
                        fs.mkdirSync(config.menu_cache_path);
                    } catch (ex) {
                        console.log(ex.message);
                    }
                }

                fs.readFile(config.menu_cache_path + req.body.menu_id, function (err, data) {
                    if (err) {
                        var pool = mysql.createPool(db);
                        pool.getConnection(function (err, connection) {
                            if (err) {
                                pool.end();
                                res.json({});
                                console.log({ "code" : err.code, "status" : err.message });
                                return;
                            } else {
                                connection.query('SELECT * FROM menu', [], function (err, rows) {
                                    connection.destroy();
                                    pool.end();
                                    
                                    var menu = menuParseById(rows, req.body.menu_id);

                                    try {
                                        fs.writeFile(config.menu_cache_path + req.body.menu_id, JSON.stringify(menu));
                                    } catch (ex) {
                                        console.log(ex.message);
                                    }
                                    
                                    res.json(menu);
                                    res.end();
                                });
                            }
                        });
                    } else {
                        res.json(JSON.parse(data));
                        res.end();
                    }
                });
            });
        }
    });
    
    function menuParseById(rows, menu_id) {
        var menu = {};
        for (i in rows) {
            if (rows[i].id == menu_id) {
                menu = rows[i];
                menu.submenus = menuParse(rows, menu.id);
            }
        }
        return menu;
    }
    
    function menuParse(rows, parent_id) {
        var menu = [];
        for (i in rows) {
            if (rows[i].parent_id == parent_id) {
                var item = rows[i];
                item.submenus = menuParse(rows, item.id);
                menu.push(item);
            }
        }
        return menu;
    }
};
