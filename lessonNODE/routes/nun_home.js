const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('nun_home', {title:'mytitle',
        fruits:['사과','배','오렌지','바나나','복숭아'],
        isloggedin: 0   //없는 경우
    });
});




module.exports = router;