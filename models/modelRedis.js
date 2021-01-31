var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RedisSchema = new Schema({
    redis : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Redis', RedisSchema);