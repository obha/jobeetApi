const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categories');
const AuthCheck = require('../middleware/check-auth');

router.get('/', CategoryController.getAll);

router.get('/:catrgoryId', CategoryController.getById);

router.post('/', CategoryController.create);

router.delete('/:catrgoryId', CategoryController.delete);

module.exports = router;