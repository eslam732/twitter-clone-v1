const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const {tweetSchema} = require('./tweet');
// Same Schema as Tweet + main Tweet

const replySchema = tweetSchema.clone();

replySchema.add({
    mainTweet: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }
});

module.exports = mongoose.model('Reply', replySchema);