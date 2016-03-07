var mysql = require('mysql');
var db = require('../../config/database');
var menu_id = 1;

module.exports = function (app) {
    app.post('/api/post/detail', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                if (req.body.subCategory == null) {
                    req.body.subCategory = '';
                }
                
                if (req.body.slug == null) {
                    req.body.slug = '';
                }
                
                connection.query('SELECT post.*, user.full_name FROM post, user, category, sub_category WHERE post.slug = ? AND category.slug = ? AND sub_category.slug = ? AND post.author_id = user.id AND post.status_id = 3 LIMIT 1', [req.body.slug, req.body.category, req.body.subCategory], function (err, rows) {
                    res.json(rows.length > 0 ? rows[0]: {});
                    connection.destroy();
                    pool.end();
                });
            }
        });
    });
    
    app.post('/api/post/relative', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT post.*, links.top_link , user.full_name, category.slug AS category_slug, sub_category.slug AS sub_category_slug FROM post,links, category, sub_category, menu, user WHERE links.post_id = ? AND links.redirect_link_id = post.id AND post.sub_category_id = sub_category.id AND category.id = sub_category.category_id AND user.id = post.author_id AND post.status_id = 3 GROUP BY post.id', req.body.post_id, function (err, rows) {
                    res.json(rows);
                    connection.destroy();
                    pool.end();
                });
            }
        });
    });
    
    app.post('/api/post/getlistsubcategory', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT sub_category.name, sub_category.slug FROM category, sub_category WHERE category.slug = ? AND sub_category.category_id = category.id', req.body.category, function (err, rows) {
                    res.json(rows);
                    connection.destroy();
                    pool.end();
                });
            }
        });
    });
    
    app.post('/api/post/getlistpostbycategory', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT post.id, post.title, post.discription, post.image_url, post.slug, post.cure, post.facebook_url, post.googleplus_url, category.slug AS category_slug, sub_category.slug AS sub_category_slug, sub_category.name AS sub_category_name FROM category LEFT JOIN sub_category ON sub_category.category_id = category.id LEFT JOIN post ON post.sub_category_id = sub_category.id WHERE category.slug = ? AND (post.status_id = 3 OR post.status_id is NULL) ORDER BY category.id, sub_category.id', req.body.category, function (err, rows) {
                    res.json(rows.length > 0 ? subCategoryParse(rows): []);
                    connection.destroy();
                    pool.end();
                });
            }
        });
    });
    
    function subCategoryParse(posts) {
        var subCategories = [{ name: posts[0].sub_category_name, slug: posts[0].sub_category_slug, posts: [] }];
        var currentSubSlug = subCategories[0].slug;
        var currentSubCategory = subCategories[0];
        
        for (i in posts) {
            if (posts[i].sub_category_slug != currentSubSlug) {
                currentSubCategory = subCategories[subCategories.push({ name: posts[i].sub_category_name, slug: posts[i].sub_category_slug, posts: [] }) - 1];
                if (posts[i].id != null) {
                    currentSubCategory.posts.push({ id: posts[i].id, title: posts[i].title, discription: posts[i].discription, image_url: posts[i].image_url, category_slug: posts[i].category_slug, sub_category_slug: posts[i].sub_category_slug, sub_category_name: posts[i].sub_category_name, slug: posts[i].slug, cure: posts[i].cure, facebook_url: posts[i].facebook_url, googleplus_url: posts[i].googleplus_url });
                }
            } else {
                if (posts[i].id != null) {
                    currentSubCategory.posts.push({ id: posts[i].id, title: posts[i].title, discription: posts[i].discription, image_url: posts[i].image_url, category_slug: posts[i].category_slug, sub_category_slug: posts[i].sub_category_slug, sub_category_name: posts[i].sub_category_name, slug: posts[i].slug, cure: posts[i].cure, facebook_url: posts[i].facebook_url, googleplus_url: posts[i].googleplus_url });
                }
            }
        }
        
        return subCategories;
    }
    
    app.post('/api/post/getlistposttags', function (req, res) {
        if (req.body.tags == null || req.body.tags.length == 0) {
            res.json([]);
            return;
        }
        
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                var likeCondition = '';
                for (i in req.body.tags) {
                    likeCondition += ' OR post.tags LIKE ' + mysql.escape('%' + req.body.tags[i].text + '%');
                }
                likeCondition = likeCondition.substring(3);
                
                connection.query('SELECT post.title, post.discription, post.image_url, post.slug, category.slug AS category_slug, sub_category.slug AS sub_category_slug FROM post,category, sub_category WHERE (' + likeCondition + ') AND post.status_id = 3 AND post.sub_category_id = sub_category.id AND category.id = sub_category.category_id AND category.id = 3', [], function (err, rows) {
                    res.json(rows);
                    connection.destroy();
                    pool.end();
                });
            }
        });
    });
    
    app.post('/api/post/getitlelist', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT name FROM category WHERE category.slug = ?', req.body.slug, function (err, rows) {
                    res.json(rows);
                    connection.destroy();
                    pool.end();
                });
            }
        });
    });
    app.post('/api/post/search', function (req, res) {
        var pool = mysql.createPool(db);
        pool.getConnection(function (err, connection) {
            if (err) {
                pool.end();
                res.json({});
                console.log({ "code" : err.code, "status" : err.message });
                return;
            } else {
                connection.query('SELECT post.*, category.slug AS category_slug, sub_category.slug AS sub_category_slug FROM post, category, sub_category WHERE post.sub_category_id = sub_category.id AND category.id = sub_category.category_id AND (post.title LIKE ? OR post.discription LIKE ? OR post.content LIKE ?) AND post.status_id = 3 GROUP BY post.id', ['%' + req.body.patten + '%', '%' + req.body.patten + '%', '%' + req.body.patten + '%'], function (err, rows) {
                    res.json(rows);
                    connection.destroy();
                    pool.end();
                });
            }
        });
    });
};