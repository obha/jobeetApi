const express = require('express');
const router = express.Router();
const mongoose  = require('mongoose');
const AuthCheck = require('../middleware/check-auth');
const Category = require('../models/category');
const Job = require('../models/job');

router.get('/', (req, res, next)=>{
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
});

router.get('/:catrgoryId', (req, res, next)=>{
    Category.findById(req.params.catrgoryId)
    .select('_id name')
    .exec()
    .then(doc => { 
        res.status(200).json(doc);
    })
    .catch( err =>{
        res.status(500).json({error: err})
    });
});

router.post('/', (req, res, next)=>{
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
});

router.patch('/', (req, res, next)=>{
    res.status(200).json({

    });
});

router.delete('/', (req, res, next)=>{
    res.status(200).json({
      
    });
});

module.exports = router;