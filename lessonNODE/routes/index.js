const express = require('express');


const router = express.Router();

router.get('/', (req, res)=>{
    res.send("routes folder's index page");
});

module.exports = router;