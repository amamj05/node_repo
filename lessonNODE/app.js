const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('session');
const dotenv = require('dotenv');
const { sign } = require('crypto');
//
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.raw());
app.use(express.text());

dotenv.config();
const app = express();

app.set('port', process.env.PORT || 3000);


app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use((req, res, next)=>{
    console.log("모든 요청");
    next();  //다음 미들웨어로 넘어가라
});

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send(err.message);
});

app.use(session({resave:false, saveUninitialized:false,
    secret: process.env.COOKIE_SECRET,
    cookie: {httpOnly:true, secure:false},
    name: 'session-cookie'
}));

app.get('/', (req, res)=>{
    res.send("express main page");
});

app.get("/html",(req, res)=>{
    res.sendFile(Path.join(__dirname, 'html.html'));
});



app.get("cookie_set", (req, res)=>{
    res.cookie("username","test01",{
        expires: new Date(Date.now()+30000),
        httpOnly: true, secure: true, signed:true
    })
});

app.get("/cookie_reset",(req, res)=>{
    res.clearCookie("username","test01",{
        httpOnly:true, secure, signed:true
    })
    res.send("!!! cookie reset !!!")
});  

// app.listen(3000, ()=>{
//     console.log("Server is running");
// });

app.listen(app.get('port'), ()=>{
    console.log("Server is running");
});


// multipart -> multer 이미지 업로드
const MYmulter = require('multer');
const mul_upload = multer({
    storage: multer.diskStorage({ destination(req, file, done){
        done(null, 'uploads/');
    },
    filename(req, file, done){
        const ext = path.extname(file.originalname);
        done(null, path.basename(file.originalname, ext) + Date.now()+ext);  //ext가 확장자? 
    }
}), 
    limits: {fileSize: 5 *1024*1024}
});  //fileSize : 5MB