const mongoose = require('mongoose');

const Job = require('../models/job');
const Category = require('../models/category');

exports.getAll=(req, res, next)=>{
    Job.find()
    .select('category type location _id logo')
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            jobs: docs
        });
    }).catch( err => {
        res.status(500).json({error: err});
    })
};

exports.createNew = async (req, res, next)=>{
    category_id = req.body.category;
    
    const job = new Job({
        _id: new mongoose.Types.ObjectId(),
        category: category_id,
        type: req.body.type,
        location: req.body.location,
        logo: req.file.path
    });
    
    const category = await Category.findById(category_id);
    
    category.jobs.push(job);
    category.save();

    job.save().then( result => {
        res.status(201).json({
            message: 'a new job posted',
            job: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });   
};

exports.getById = (req, res, next)=>{
    const id = req.params.jobId;
    Job.findById(id)
    .exec()
    .then(doc => {  
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message: 'job not found'})
        }  
    }).catch(err => {
        res.status(500).json({error: err});
    });
};

exports.update = (req, res, next)=>{
    Job.update({_id: req.params.jobId}, 
        { $set: { type: req.body.type, location: req.body.location }
    })
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error:err});
    });
};

exports.delete = (req, res, next)=>{
    Job.remove({_id: req.params.jobId})
    .exec()
    .then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};