const express = require('express');
const comment = require('../models/comment');
const User = require('../models/user');

const router = express.Router();

router.get('/', async(req, res, next)=>{
    try{
        const users = await User.findAll();
        res.render('sequelize', {user});
        // const cashing = User.findAll(
        //     if cache[name] == 'test01'{where:{name:'test01'}})
    }catch(err){console.error(err); next(err);}
});


module.exports = router;