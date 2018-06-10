const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user:{ type: mongoose.Schema.Types.Mixed, ref:'User'},
    category: { type:mongoose.Schema.Types.ObjectId, ref:'Category' ,require:true},
    type: { type:String, require:true },
    location: { type:String, require:true },
    logo: { type:String, require: true}
});

module.exports = mongoose.model('Job', schema);