const functions = require("firebase-functions");
//const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

const database = admin.database().ref('/articles');
const login = admin.database().ref('/users');

exports.addArticle = functions.https.onRequest((req, res) => {

    if(req.method === 'POST') {

        var token = req.query.token;

        var author = req.body.author;
        var category = req.body.category;
        var title = req.body.title;
        var image = req.body.image;
        var text = req.body.text;

        if(author && category && title && image && text && token) {

            return admin.database().ref('users').orderByChild('token').equalTo(token).once('value', function(snapshot) {
                if(snapshot.val()) {

                    database.push({
                        author: author,
                        category: category,
                        title: title,
                        image: image,
                        text: text
                    }).then(function(snapshot) {

                        var key = snapshot.key;

                        admin.database().ref(`/articles/${key}`).on('value', function(snapshot) {

                            if(snapshot.val()) {
                                var snapshotBody = snapshot.val();
                                snapshotBody["id"] = key;

                                res.status(200).send(
                                    snapshotBody
                                );
                            }
                            else {
                                res.status(404).send();
                            }
                        })

                    });
                } else {
                    res.status(403).send('Invalid token');
                }
            });
        }
        else {
            res.status(400).send('Missing parameter');
        }
    }
    else {
        res.status(400).send();
    }
});

exports.getArticles = functions.https.onRequest((req, res) => {
    
    if(req.method === 'GET') {

        var token = req.query.token;

        if(token) {
            return admin.database().ref('users').orderByChild('token').equalTo(token).once('value', function(snapshot) {
                if(snapshot.val()) {

                    return database.orderByChild('key').on('value', (snapshot) => {

                        if(snapshot.val()) {

                            var articles = [];

                            snapshot.forEach(function(childSnapshot) {
                                var key = childSnapshot.key;
                                var childSnapshotBody = childSnapshot.val();
                                childSnapshotBody["id"] = key;

                                articles.push(
                                    childSnapshotBody
                                )

                            });
                            res.status(200).send(articles);
                        }
                        else {
                            res.status(404).send();
                        }
                    })
                }
            })
        }
    }
    else {
        res.status(400).send();
    }
});

exports.deleteArticle = functions.https.onRequest((req, res) => {

    if(req.method === 'DELETE') {

        var token = req.query.token
        var key = req.query.key

        if(key && token) {
            return admin.database().ref('users').orderByChild('token').equalTo(token).once('value', function(snapshot) {
                if (snapshot.val()) {
                    return admin.database().ref(`/articles/${key}`).remove()
                }
            })
        }
        else {
            res.status(400).send('No matches for id');
        }
    }
    else {
        res.status(400).send();
    }
});

exports.getArticleId = functions.https.onRequest((req, res) => {
    
    if(req.method === 'GET') {

        var token = req.query.token
        var key = req.query.key;
        
        if(key && token) {

            return admin.database().ref('users').orderByChild('token').equalTo(token).once('value', function(snapshot) {
                if (snapshot.val()) {

                    return database.child(key).on('value', (snapshot) => {

                        if(snapshot.val()) {
                            var snapshotBody = snapshot.val();
                            snapshotBody["id"] = key;

                            res.status(200).send(
                                snapshotBody
                            );
                        }
                        else {
                            res.status(404).send();
                        }
                    })
                }
            })
        }
        else {
            res.status(400).send('No matches for id');
        }
    }
    else {
        res.status(400).send();
    }
});

exports.getArticleCategory = functions.https.onRequest((req, res) => {

    if(req.method === 'GET') {

        var token = req.query.token
        var category = req.query.category;

        if(category && token) {

            return admin.database().ref('users').orderByChild('token').equalTo(token).once('value', function(snapshot) {

                if (snapshot.val()) {

                    return database.orderByChild('category').equalTo(category).on('value', (snapshot) => {

                        if(snapshot.val()) {

                            var articles = [];

                            snapshot.forEach(function(childSnapshot) {

                                var key = childSnapshot.key;

                                articles.push({
                                    [key]: childSnapshot
                                });
                            });
                            res.status(200).send(articles);

                        }
                    })
                }
            })
        }
        else {
            res.status(400).send('Missing category');
        }
    }
    else {
        res.status(400).send();
    }
});

exports.updateArticle = functions.https.onRequest((req, res) => {
    
    if(req.method === 'PUT') {

        var token = req.query.key
        var key = req.query.key;

        if(key && token) {

            return admin.database().ref('users').orderByChild('token').equalTo(token).once('value', function(snapshot) {

                if (snapshot.val()) {

                    var text = req.body.text;

                    if(text) {

                        return admin.database().ref(`/articles/${key}`).on('value', (snapshot) => {
                            if(snapshot.val()) {

                                snapshot.ref.update({
                                    "text": text
                                });

                                return admin.database().ref(`/articles/${key}`).on('value', (snapshot) => {
                                    if(snapshot.val()) {
                                        var key = snapshot.key;

                                        res.status(200).send({
                                            [key]: snapshot.val()
                                        });
                                    }
                                })
                            }
                        })
                    }
                    else {
                        res.status(400).send('Missing text');
                    }
                }
            })
        }
        else {
            res.status(400).send('No matches for id');
        }
    }
    else {
        res.status(400).send();
    }
});

exports.auth = functions.https.onRequest((req, res) => {

    if(req.method === 'POST') {

        var username = req.query.username;
        var password = req.query.password;

        if(username) {
            if (password) {

                return login.orderByChild('username').equalTo(username).once('value', (snapshot) => {

                    if (snapshot.val()) {

                        console.log(snapshot.val());

                        var obj = snapshot.val();
                        var key = Object.keys(obj)[0];
                        var user = obj[key];

                        if (user.password === password) {

                            console.log("User " + user);
                            console.log("Key " + key);
                            console.log(user.username);
                            console.log(user.password);

                            return admin.auth().createCustomToken(user.username).then((token) => {
                                console.log(token);
                                snapshot.child(key).ref.update({
                                    "token": token
                                }).catch(function(error) {
                                    console.log("Marek " + error);
                                });

                                res.status(200).send(token);
                            });

                        } else {
                            res.status(403).send('Incorrect password');
                        }
                    } else {
                        res.status(403).send('Incorrect username');
                    }
                });
            } else {
                res.status(400).send('Missing parameter');
            }
        } else {
            res.status(400).send('Missing parameter');
        }
    } else {
        res.status(400).send();
    }
});
