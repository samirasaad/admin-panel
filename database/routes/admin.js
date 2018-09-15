const express = require('express');
const app = express();
const router=express.Router();
const adminControllers=require('../controllers/admin');
router.get('/adminlogins',adminControllers.get);
router.post('/adminlogins',adminControllers.add);
router.delete('/adminlogins',adminControllers.del);
module.exports = router;
