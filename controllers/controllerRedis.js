const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

const incrementToken = (req, res, token, d) => {
    client.get(token, function(err, token_value){
        if (token_value < 10){
            client.incr(token);
            client.ttl(token, redis.print);
            client.get(token, redis.print);
            res.status(200).json(d);
        }
        else{
            req.session.logged = false;
            res.status(400).json({error : "Attendez 10min"});
        }
    });
}

function connectToken(req, token){
    const jwt = require('jsonwebtoken')
    try{
        const payload = jwt.verify(token, "My so secret sentence");
        req.session.logged = true;
        req.session.token = token;

    } catch(error) {
        console.error(error.message);
        req.session.logged = false;
    }

    return req;
}

function readRedis(req, res) {
    let Redis = require("../models/modelRedis");
    const token = req.header('Authorization').replace('Bearer ', '');

    if (req.session.logged !== true || req.session.token !== token){
        req = connectToken(req, token);
    }


    if (req.session.logged === true){
        Redis.find({})
        .then((d) => {
                client.exists(token, function(err, reply){

                    if (reply === 0){
                        client.set(token, 1);
                        client.expire(token, 600);
                        client.ttl(token, redis.print);
                        client.get(token, redis.print);
                        res.status(200).json(d);
                    }
                    else {
                        incrementToken(req, res, token, d);
                    }
                });
        }, (err) => {
            res.status(500).json(err);
        });
    }
    else{
        res.status(400).json({error : "token non-valide"});
    }
 }

function addRedis(req, res) {
    let Redis = require("../models/modelRedis");
    let newRedis = Redis ({});

    newRedis.save()
    .then((savedRedis) => {

        res.json(savedRedis);
            
    }, (err) => {
        res.status(400).json(err)
    });
}

module.exports.readRedis = readRedis;
module.exports.addRedis = addRedis;

