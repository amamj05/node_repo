import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks';


const __dirname = path.resolve();
const testAPP = express();



// view 
testAPP.set('view engine', 'html');

//nunjucks
nunjucks.configure('views', {
    watch: true,
    express : testAPP
});

testAPP.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});

testAPP.get('/write', (req, res) => {
    res.render('write.html');
});


testAPP.listen(3000, ()=>{
    console.log('Server is running');
});