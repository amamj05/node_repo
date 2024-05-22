// ESM express 모듈 사용


import express from 'express';
import path from 'path';

const __dirname = path.resolve();

const myAPP = express();

//middleware
//main page GET
myAPP.get('/',(req, res) => {
    res.sendFile(__dirname + '/public/main.html');  
    //__dirname 은 import path 필요


    //
    // res.send('Main page GET request');
    // res.send('<h1>hi</h1>');
    // res.send(`
    // <h1>hi</h1>
    // <h1>hi</h1>
    // <h1>hi</h1>
    // <h1>hi</h1>
    // `);
    // res.sendFile(HTML파일로 보내주기도함);
});

myAPP.listen(3000, () => {
    console.log('Server is running');
});



// 현재 위치로 이동 : cd 폴더위치 
// 실행 : node 파일이름