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
            const user = await User.create(
                { name: req.body.name, 
                    age: req.body.name, 
                    marketing: req.body.marketing
                }
            );
            res.status(201).json(user)
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
    }catch(err){console.error(err); next(err);}
});

module.exports = router;