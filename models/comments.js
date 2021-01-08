const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentSchema=new Schema({
content:{
    type:String
},
postOfComment:{
    type:Schema.Types.ObjectId,
    ref:"Post"
},
creator:{
    type:Schema.Types.ObjectId,
    ref:"User"
}

});

module.exports = mongoose.model('Comment',commentSchema);