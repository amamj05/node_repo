// nunjucks 사용


import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks';

const __dirname = path.resolve();

const myAPP = express();

// view set
myAPP.set('view engine', 'html');   // main.html -> main(.html)


// nunjucks 
nunjucks.configure('views', {
    watch: true,
    // html이 수정될때 바로바로 반영 후 렌더링
    express: myAPP
});



myAPP.get('/',(req, res) => {
    res.sendFile(__dirname + '/public/main.html'); });


myAPP.get('/write', (req, res) =>{
    res.render('write.html');
});

myAPP.listen(3000, () => {
    console.log('Server is running');
});