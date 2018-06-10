const express = require('express');
const router = express.Router();

const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads');
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString()+ file.originalname);
    },
});

const upload = multer({storage: storage, 
    limits:{
        fileSize: 256 * 256 * 5
    }
});

const checkAuth = require('../middleware/check-auth');

const JobsController = require('../controllers/jobs');

router.get('/', JobsController.getAll);

router.post('/', upload.single('companyLogo'),JobsController.createNew);

router.get('/:jobId', JobsController.getById);

router.patch('/:jobId', JobsController.update);

router.delete('/:jobId', JobsController.delete);

module.exports = router;