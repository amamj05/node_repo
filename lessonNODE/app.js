const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('session');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.set('port', process.env.PORT || 3000);


app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use((req, res, next)=>{
    console.log("모든 요청");
    next();  //다음 미들웨어로 넘어가라
});

app.get('/', (req, res)=>{
    res.send("express main page");
});

app.listen(3000, ()=>{
    console.log("Server is running");
});

// app.get('/img', ()=>{});