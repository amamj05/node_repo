const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const {sequelize} = require('./models');
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views',{express:app, watch:true}); //models 완료후 true로

sequelize.sync({force: false}).then(()=>{console.log('DB 연결됨')})
.catch((err)=>{console.error(err)});

app.listen(app.get("port"), ()=>{console.log("DB 접속");})