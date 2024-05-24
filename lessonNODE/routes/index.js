const express = require('express');


const index_router = express.Router();

index_router.get('/', (req, res)=>{
    res.send("routers folder's index page")
});

module.exports = index_router;