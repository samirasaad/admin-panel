const express = require('express');
const app = express();
const mongodb = require('mongodb')
const router=express.Router();
const userControllers=require('../controllers/user');
router.get('/users',userControllers.get);
router.post('/users',userControllers.add);
router.delete('/users/:id',userControllers.del);
router.put('/users/:id',userControllers.edit);
module.exports = router;
