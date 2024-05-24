const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
// const { sign } = require('crypto');
const indexRouter = require('./routes');  // 경로 (index 생략)
const userRouter = require('./routes/user');  // 경로 (.js 생략)
const nunjucks = require('nunjucks');
const nunjucksHOMErouter = require('./routes/nun_home');
const nunjucksUSERrouter = require('./routes/nun_user');

dotenv.config();
const app = express();

//// SET

app.set('port', process.env.PORT || 3000);


// nunjucks setting
app.set('view engine','html');
nunjucks.configure('views',{express:app, watch:true});


//// USE 

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.raw());
app.use(express.text());

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



// Router

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/nun_home', nunjucksHOMErouter);
app.use('/nun_user', nunjucksUSERrouter);


// multipart -> multer 이미지 업로드

const MYmulter = require('multer');
const MYfs = require('fs');

try{
    MYfs.readdirSync('uploads');
}catch(err){
    MYfs.mkdirSync('uploads');
}

const mul_upload = MYmulter({
    storage: MYmulter.diskStorage({ destination(req, file, done){
        done(null, 'uploads/');
    },
    filename(req, file, done){
        const ext = path.extname(file.originalname);
        done(null, path.basename(file.originalname, ext) + Date.now()+ext);  //ext가 확장자? 
    }
}), 
    limits: {fileSize: 5 *1024*1024}
});  //fileSize : 5MB



///// GET


app.get('/', (req, res)=>{
    res.send("express main page");
});

app.get("/html",(req, res)=>{
    res.sendFile(Path.join(__dirname, 'test_html.html'));
});

app.get("/myerror", (req, res, next)=>{
    console.log("create err");
    next();
}, (req, res)=>{
    throw new Error("Error Error Error Error");
}
);

app.use((err, req, res, next)=>{
    // 
});


// cookieParser
app.get("cookie_set", (req, res)=>{
    res.cookie("username","test01",{
        expires: new Date(Date.now()+30000),
        httpOnly: true, secure: true, signed:true
    });
    res.cookie("nickname", "test01")
    res.send("!!! cookie setting")
});

app.get("/cookie_reset",(req, res)=>{
    res.clearCookie("username","test_new",{
        httpOnly:true, secure, signed:true
    })
    res.send("!!! cookie reset !!!")
});  



// multipart -> multer 이미지 업로드 PAGE

// 1
app.get('/upload', (req, res)=>{
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('upload', mul_upload.single('img'),(req, res)=>{
    console.log(req.file, req.body);
    res.send('업로드 성공');
});

// 2
app.get('/upload2', (req, res)=>{
    res.sendFile(path.join(__dirname, 'multipart2.html'));
});
app.post('upload2', mul_upload.array('many'),(req, res)=>{
    console.log(req.files, req.body);
    res.send('업로드 성공');
});

// 3
app.get('/upload3', (req, res)=>{
    res.sendFile(path.join(__dirname, 'multipart3.html'));
});
app.post('upload3', mul_upload.fields([{name: 'img1'},{name:'img2'}]),(req, res)=>{
    console.log(req.files, req.body);
    res.send('업로드 성공');
});

// 4
app.get('/upload4', (req, res)=>{
    res.sendFile(path.join(__dirname, 'multipart4.html'));
});
app.post('upload4', mul_upload.none(),(req, res)=>{
    console.log(req.body);
    res.send('업로드 성공');
});




// app.listen(3000, ()=>{
//     console.log("Server is running");
// });

app.listen(app.get('port'), ()=>{
    console.log("Server is running");
});

