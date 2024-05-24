const express = require('express');


const router = express.Router();

router.get('/', (req, res)=>{    // 왜 / 인데 /user로 인식되는거지?
    res.send("routes folder's user page");
});


router.get('/user/:id', (req, res)=>{
    res.send(`<p> user ${req.params.id} page </p>`);
});

router.get('/abc', (req, res)=>{
    res.send("/abc GET");
});

router.post('/abc', (req, res)=>{
    res.send("/abc post");
});

router.route('/abc2').get((req, res)=>{res.send("abc2 GET");}).post((req, res)=>{res.send("abc2 post");});


module.exports = router;