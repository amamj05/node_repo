//360P

const express = require('express');
// const User = require('../models/user');
// const comment = require('../models/comment');
const { comment } = require('../models/');

const router = express.Router();


router.route('/:id').patch(async (req, res, next) => {
    try {
        const result = await comment.update(
            { comment: req.body.comment },
            { where: { id: req.params.id } });
        res.json(result);
    } catch (err) { console.error(err); next(err); }
}).delete(async (req, res, next) => {
    try {
        const result = await comment.destroy(
            { where: { id: req.params.id } });
        res.json(result);
    } catch (err) { console.error(err); next(err); }
}
);


document.getElementById('comment-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const id = e.target.userid.value;
    const comment = e.target.comment.value;
    try {
        await axios.post(`/comment`, {id, comment});
        getComment(id);
    } catch (err) { console.error(err); next(err); }
    e.target.userid.value = '';
    e.target.comment.value = '';
});



router.post('/', async(req, res, next)=>{
    try{
        const comment = await comment.create({
            commenter: req.body.id,
            comment:req.body.comment
        });
        res.status(201).json(comment);
    }catch(err){console.error(err); next(err);}
});



module.exports = router;

