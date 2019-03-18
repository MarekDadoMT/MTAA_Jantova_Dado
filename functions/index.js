const functions = require("firebase-functions");
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

const database = admin.database().ref('/articles');


const getArticlesFromDatabase = (res) => {
    let articles = [];

    return database.on('value', (snapshot) => {
        snapshot.forEach((article) => {
            articles.push({
                id: article.key,
                author: article.val().author,
                category: article.val().category,
                title: article.val().title,
                text: article.val().text
            });
        });
        res.status(200).json(articles);
    }, (error) => {
        res.status(error.code).json({
            message: `Something went wrong. ${error.message}`
        })
    })
};
exports.addArticle = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if(req.method !== 'POST') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        };

        var author = req.body.author;
        var category = req.body.category;
        var title = req.body.title;
        var text = req.body.text;

        database.push({ 
            author: author,
            category: category,
            title: title,
            text: text
        });
        getArticlesFromDatabase(res)
    });
});

exports.getArticles = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if(req.method !== 'GET') {
            return res.status(401).json({
                message: 'Not allowed'
            });
        };
        getArticlesFromDatabase(res)
    });
});

exports.deleteArticle = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if(req.method !== 'DELETE') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        }
        const id = req.body.id
        admin.database().ref(`/articles/${id}`).remove()
        getArticlesFromDatabase(res)
    })
})

exports.getArticleId = functions.https.onRequest((req, res) => {
    
    if(req.method === 'GET') {
        
        var key = req.query.key
        
        if(key) {
            
            return database.child(key).on('value', (snapshot) => {
                if(snapshot.val()) {
                    res.status(200).send({
                        [key]: snapshot.val()
                    });
                }
            })
        }
    }
});

exports.getArticleCategory = functions.https.onRequest((req, res) => {
    let articles = [];
    var category = req.query.category;

    return database.orderByChild('category').equalTo(category).on('value', (snapshot) => {
        
        snapshot.forEach(function(childSnapshot) {

            var key = childSnapshot.key;
            
            articles.push({
                [key]: childSnapshot
            });
        });
        res.status(200).send(articles);
    }, (error) => {
        res.status(error.code).json({
            message: `Something went wrong. ${error.message}`
        })
    })
});

exports.updateArticle = functions.https.onRequest((req, res) => {
    
    if(req.method === 'PUT') {
        
        var id = req.query.id;

        if(id) {

            var text = req.body.text;
            
            if(text) {
            
                return admin.database().ref(`/articles/${id}`).on('value', (snapshot) => {
                    if(snapshot.val()) {
                        snapshot.ref.update({
                            "text": text
                        });

                        return admin.database().ref(`/articles/${id}`).on('value', (snapshot) => {
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
        }
    }
});