var mysql = require('mysql');
var db = require('../../../config/database');

module.exports = function (app) {
    app.post('/api/admin/postdetail', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({
                    "code": 100,
                    "status": "Error in connection database"
                });
                return;
            } else {
                if (req.body.role == 1) {
                    connection.query('SELECT * FROM post WHERE post.id = ?', req.body.post_id, function (err, rows) {
                        res.json(rows);
                        connection.destroy();
                        pool.end();
                    });
                } else {
                    connection.query('SELECT * FROM post WHERE post.id = ? AND post.author_id = ? AND post.status_id != 3', [req.body.post_id, req.body.author_id], function (err, rows) {
                        res.json(rows);
                        connection.destroy();
                        pool.end();
                    });
                }
            }
        })
    });
    
    app.post('/api/admin/postfulldetail', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({
                    "code": 100,
                    "status": "Error in connection database"
                });
                return;
            } else {
                connection.query('SELECT post.slug, post.cure, post.title, post.discription, sub_category.name AS sub_category_name, sub_category.slug AS sub_category_slug, category.slug AS category_slug FROM post, category, sub_category WHERE post.id = ? AND post.sub_category_id = sub_category.id AND category.id = sub_category.category_id AND post.status_id = 3 LIMIT 1 ', [req.body.post_id], function (err, rows) {
                    res.json(rows);
                    connection.destroy();
                    pool.end();
                });
            }
        })
    });
    
    app.post('/api/admin/postrelavtive', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({
                    "code": 100,
                    "status": "Error in connection database"
                });
                return;
            } else {
                
                connection.query('SELECT * FROM links WHERE links.post_id = ?', req.body.id, function (err, rows) {
                    res.json(rows);
                    connection.destroy();
                    pool.end();
                });
            }
        })

    });
    
    app.post('/api/admin/sub_category_slug', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : 100, "status" : "Error in connection database" });
                return;
            } else {
                connection.query('SELECT slug FROM sub_category WHERE id = ?', req.body.sub_category_id, function (err, rows) {
                    connection.destroy();
                    pool.end();
                    
                    res.json(rows);
                });
            }
        });
    });
    
    app.post('/api/admin/slug', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : 100, "status" : "Error in connection database" });
                return;
            } else {
                connection.query('SELECT post.slug AS post_slug, category.slug AS category_slug, sub_category.slug AS sub_category_slug FROM post, category, sub_category WHERE post.sub_category_id = sub_category.id AND category.id = sub_category.category_id AND post.id = ?', req.body.id, function (err, rows) {
                    connection.destroy();
                    pool.end();
                    
                    res.json(rows);
                });
            }
        });
    });
    
    app.post('/api/admin/update', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : 100, "status" : "Error in connection database" });
                return;
            }
            else {
                var data = {
                    title: req.body.title,
                    sub_category_id: req.body.sub_category_id,
                    author_id: req.body.author_id,
                    status_id: req.body.status_id,
                    slug: req.body.slug,
                    content: req.body.content,
                    image_url: req.body.image_url,
                    date_last_update: new Date(),
                    discription: req.body.discription,
                    on_page: req.body.on_page,
                    tags: JSON.stringify(req.body.tags),
                    facebook_url: req.body.facebook_url || '',
                    googleplus_url: req.body.googleplus_url || '',
                    cure: req.body.cure || ''
                }
                
                connection.query('UPDATE post SET ? WHERE id = ?', [data, req.body.id], function (err, rows) {
                    connection.query('DELETE FROM links WHERE post_id =  ?', req.body.id);
                    console.log(req.body.id);
                    
                    for (var i = 0; i < req.body.links.length; i++) {
                        var idata = {
                            post_id: req.body.id,
                            redirect_link_id: req.body.links[i].redirect_link_id,
                            top_link: req.body.links[i].top_link
                        }
                        
                        connection.query('INSERT INTO links SET ?', idata);
                    };
                    
                    res.json({
                        sub_category_id: data.sub_category_id,
                        post_slug: data.slug
                    });
                });
            }
        })
    });
};