const mongoose = require('mongoose');
const Category = require('../models/category');

exports.getAll = (req, res, next)=>{
    Category.find()
    .exec()
    .then(docs => { 
        res.status(200).json({
            count: docs.length,
            categories: docs.map(doc =>{
                return{
                    _id:doc._id,
                    name:doc.name,
                    jobs: doc.jobs.map(job =>{
                        return{
                            _id:job._id,
                            type:job.type,
                            location:job.location,
                            logo: 'http://'+req.headers.host+'/'+job.logo
                        }
                    })
                }
            })
        });
    })
    .catch( err =>{
        res.status(500).json({error: err})
    });
};

exports.getById = (req, res, next)=>{
    Category.findById(req.params.catrgoryId)
    .select('_id name')
    .exec()
    .then(doc => { 
        res.status(200).json(doc);
    })
    .catch( err =>{
        res.status(500).json({error: err})
    });
};

exports.create = (req, res, next)=>{
    const category = new Category({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name
    });
    category.save()
    .then(result => {
        res.status(200).json(result);
    })
    .catch( err =>{
        res.status(500).json({error: err})
    });
};

exports.delete = (req, res, next)=>{
    Category.findById(req.param.catrgoryId)
    .remove()
    .exec()
    .then(doc=>{
        res.status(200).json({
            message:"category is deleted"
        })
    })
    .catch(err =>{
        res.status(500).json({error:err})
    });
};