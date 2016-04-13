var mysql = require('mysql');
var fs = require('fs');
var db = require(__base + 'config/database');
var config = require(__base + 'config/local_config');

module.exports = function (app) {
    app.post('/api/admin/catalog', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT sub_category.id, category.id AS category_id, sub_category.name, category.name AS category_name, sub_category.name AS sub_category_name FROM sub_category JOIN category ON category.id = sub_category.category_id ORDER BY category.id ASC ', function (err, rows) {
                    connection.destroy();
                    pool.end();

                    var result = [];
                    rows.forEach(function (e) {
                        result.push({
                            id: e.id,
                            category_id: e.category_id,
                            name: e.category_name + ' - ' + e.name
                        });
                    });

                    res.json(result);
                });
            }
        });
    });
    
    app.post('/api/admin/status', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT id, name FROM status', function (err, rows) {
                    connection.destroy();
                    pool.end();
                    res.json(rows);
                });
            }
        });
    });
    
    app.post('/api/admin/authors', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT full_name AS name FROM user', function (err, rows) {
                    connection.destroy();
                    pool.end();
                    res.json(rows);
                });
            }
        });
    });
    
    app.post('/api/admin/posts', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT post.id, post.title, post.date_init, user.full_name, category.name AS category_name, sub_category.name AS sub_category_name FROM post, category, sub_category,user WHERE post.sub_category_id = sub_category.id AND sub_category.category_id = category.id AND user.id = post.author_id', function (err, rows) {
                    connection.destroy();
                    pool.end();
                    res.json(rows);
                });
            }
        });
    });
    
    app.post('/api/admin/customers', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT * FROM customer', function (err, rows) {
                    connection.destroy();
                    pool.end();
                    
                    res.json(rows);
                });
            }
        });
    });
    
    app.post('/api/admin/sposts', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                if (req.body.role == 1) {
                    connection.query('SELECT post.id, post.title, post.date_init, user.full_name, category.name AS category_name, sub_category.name AS sub_category_name FROM post, category, sub_category, user WHERE post.sub_category_id = sub_category.id AND sub_category.category_id = category.id AND user.id = post.author_id AND post.status_id = ?', req.body.status_id, function (err, rows) {
                        connection.destroy();
                        pool.end();
                        res.json(rows);
                    });
                } else if ((req.body.status_id) == 3 && (req.body.role == 2)) {
                    res.json([]);
                } else {
                    connection.query('SELECT post.id, post.title, post.date_init, user.full_name, category.name AS category_name, sub_category.name AS sub_category_name FROM post, category, sub_category, user WHERE post.sub_category_id = sub_category.id AND sub_category.category_id = category.id AND user.id = post.author_id AND post.status_id = ? AND post.author_id = ?', [req.body.status_id, req.body.user_id], function (err, rows) {
                        connection.destroy();
                        pool.end();
                        res.json(rows);
                    });
                }
          
            }
        })
    });
    
    app.post('/api/admin/create', function (req, res) { 
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                
                var data = {
                    title: req.body.title,
                    sub_category_id: req.body.sub_category_id,
                    author_id: req.body.author_id,
                    status_id: req.body.status_id,
                    slug: req.body.slug,
                    content: req.body.content,
                    image_url: req.body.image_url,
                    date_init: new Date(req.body.date_init),
                    date_last_update: new Date(req.body.date_init),
                    discription: req.body.discription,
                    on_page: req.body.on_page,
                    tags: JSON.stringify(req.body.tags),
                    cure: req.body.cure,
                    facebook_url: req.body.facebook_url,
                    googleplus_url: req.body.googleplus_url
                }
                
                connection.query('INSERT INTO post SET ?', data, function (err, rows) {
                    for (var i = 0; i < req.body.links.length; i++) {
                        var idata = {
                            post_id: rows.insertId,
                            redirect_link_id: req.body.links[i].redirect_link_id
                        }
                        
                        connection.query('INSERT INTO links SET ?', idata);
                    };
                    
                    res.json({
                        post_id: rows.insertId
                    });

                });
            }
        });
    });
    
    app.post('/api/admin/login', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT id, full_name, role FROM user WHERE username = ? AND password = ?', [req.body.username, req.body.passwd], function (err, rows) {
                    connection.destroy();
                    pool.end();
                    res.json(rows);
                });
            }
        });
    });
    
    app.post('/api/admin/menu', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT id, name, uri, parent_id, content FROM menu', [], function (err, rows) {
                    connection.destroy();
                    pool.end();
                    res.json(menuParse(rows, null));
                });
            }
        });
    });
    
    function menuParse(rows, parent_id) {
        var menu = [];
        for (i in rows) {
            if (rows[i].parent_id == parent_id) {
                var item = rows[i];
                item.submenus = menuParse(rows, item.id);
                item.collapse = false;
                menu.push(item);
            }
        }
        return menu;
    }
    
    app.post('/api/admin/update_menu', function (req, res) {       
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT id, name, uri, parent_id, content FROM menu', [], function (err, rows) {
                    var unUseItems = getUnUseItem(menuParse(rows, req.body[0].id), req.body[0].submenus);
                    deleteUnUseItem(unUseItems, connection);
                });
                
                saveMenu(req.body, null, connection);

                setTimeout(function () {
                    fs.readdir(config.menu_cache_path, function (err, files) {
                        if (!err) {
                            files.forEach(function (file) {
                                fs.unlink(config.menu_cache_path + file);
                            });
                        }
                    });
                }, 10 * 1000);
            }
        });
    });
    
    function saveMenu(menu, parentId, connection) {
        if (menu == null || menu.length == 0) return;
        
        var insertItems = [];
        var updateItems = [];
        for (i in menu) {
            if (menu[i].id != null) {
                updateItems.push(menu[i]);
            } else {
                insertItems.push(menu[i]);
            }
        }
        
        insertItems.forEach(function (item) {
            connection.query('INSERT INTO menu(name, uri, parent_id, content) VALUES (?, ?, ?, ?)', [item.name, item.uri, parentId, item.content], function (err, result) {
                saveMenu(item.submenus, result.insertId , connection);
            });
        });
        
        updateItems.forEach(function (item) {
            connection.query('UPDATE menu SET name = ? , uri = ?, parent_id = ?, content = ? WHERE id = ?', [item.name, item.uri, item.parent_id, item.content, item.id], function (err) {
                saveMenu(item.submenus, item.id , connection);
            });
        });
    }
    
    function getUnUseItem(oldMenu, newMenu) {
        if (oldMenu.length == 0) return [];
        if (newMenu.length == 0) return oldMenu;
        
        var unUseItem = [];
        
        for (i in oldMenu) {
            var item = findItem(newMenu, oldMenu[i].id);
            if (item) {
                unUseItem = unUseItem.concat(getUnUseItem(oldMenu[i].submenus, item.submenus));
            } else {
                unUseItem.push(oldMenu[i]);
            }
        }
        
        return unUseItem;
    }
    
    function deleteUnUseItem(unUseItem, connection){
        unUseItem.forEach(function (item) {
            if (item.submenus.length > 0) {
                deleteUnUseItem(item.submenus, connection);
            }

            connection.query('DELETE FROM menu WHERE id = ?', [item.id]);
        });
    }
    
    function findItem(menuItems, id) {
        for (j in menuItems) {
            if (menuItems[j].id == id) return menuItems[j];
        }
    }
};
