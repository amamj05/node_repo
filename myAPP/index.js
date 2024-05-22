import express from 'express';

const myAPP = express();

//middleware
//main page GET
myAPP.get('/',(req, res) => {
    res.send('Main page GET request');
});

myAPP.listen(3000, () => {
    console.log('Sever is running');
});