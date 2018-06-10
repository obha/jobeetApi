const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require:true },
    jobs: [
       {type: mongoose.Schema.Types.Mixed , ref:'Job'}
    ]
});

module.exports = mongoose.model('Category', categorySchema);