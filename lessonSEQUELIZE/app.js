const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');


const {sequelize} = require('./models');

// route import
const indexRouter = require('./routes');
const UserRouter = require('./routes/users');
const commentRouter = require('./routes/comments');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views',{express:app, watch:true}); //models 완료후 true로


// routes use
app.use(express.urlencoded({extended:false}));
app.use('/', indexRouter);
app.use('/users', UserRouter);
app.use('/comments', commentRouter);
app.use('/', express.static(path.join(__dirname, 'publick')));


sequelize.sync({force: true}).then(()=>{console.log('DB 연결됨')})
.catch((err)=>{console.error(err)});

app.listen(app.get("port"), ()=>{console.log("DB 접속");})