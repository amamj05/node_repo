const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('nun_user', {title: 'MYtitle'});
});

module.exports = router;