const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('nun_home', {title:'mytitle'});
});

module.exports = router;