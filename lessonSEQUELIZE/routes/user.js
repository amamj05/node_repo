// 358p
const express = require('express');
const User = require('../models/user');
const comment = require('../models/comment');

const router = express.Router();

// router.route('/').get().post();
router.route('/').get(
    async (req, res, next)=>{
        try{
            const users = await User.findAll();
            res.json(users);
        }catch(err){console.error(err); next(err);}
    }
).post(
    async (req, res, next)=>{
        try{
            console.log("@@@@@@@@@여기안됨@@@@@@@@");
            // const { name, age, comment, marketing } = req.body;
            // const post_name = req.body.username;
            // const post_age = req.body.age;
            // const post_marketing = req.body.marketing; 
            console.log('req.body:', req.body);   ///
            const user = await User.create(
            {
                 name: req.body.username, 
                 age: req.body.age, 
                 marketing: req.body.marketing 
                // name: post_name,
                // age: post_age,
                // marketing: post_marketing 
            }
            );
            res.status(201).json(user);
        }catch(err){console.error(err); next(err);}
    }
);


router.get('/:id/comment', async (req, res, next)=>{
    try{
        const comments = await comment.findAll({
            include: {model:User,
                where: {id: req.params.id}
            }
        });
        res.json(comments);
    }catch(err){console.error(err); next(err);}
});

module.exports = router;