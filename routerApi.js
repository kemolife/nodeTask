const router = require('express').Router();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const url = "https://httpbin.org/get?arg1=val";
const mongoClient = require("mongodb").MongoClient;
const logMiddleware = require('./logMiddleware');
const db = require('./config');

/**
 * insert all params in resource https://httpbin.org/get?arg1=val into mongoDB
 */
mongoClient.connect(db.url, (err, database) => {
    if (err) return console.log('xxx' + err);
    router.get('/', function (req, res) {
        fetch(url)
            .then(res =>
                res.text()
            )
            .then(body => {
                    database.collection("api").insertOne(JSON.parse(body), {}, (err, res) => {
                        if (err) {
                            console.log({'error': 'An error has occurred'});
                        }
                    });
                    res.send(body)
                }
            );
    });
});

module.exports = router;
