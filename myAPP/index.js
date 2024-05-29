import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
//file을 다룰수 있는 fs (/data/writing.json)
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const __dirname = path.resolve();
const app = express();


// 데이터 저장
// file path
const jsonPath = path.join(__dirname, 'data', 'writing.json');
// __dirname은 현재 파일의 위치폴더



// body parser set
app.use(bodyParser.urlencoded({ extended: false })); // express 기본 모듈 사용
app.use(bodyParser.json());

// view engine set
app.set('view engine', 'html'); // main.html -> main(.html)

// nunjucks
nunjucks.configure('views', {
    watch: true, // html 파일이 수정될 경우, 다시 반영 후 렌더링
    express: app
})

// middleware
// main page GET
app.get('/', async (req, res) => {
    // const jsonData = fs.readFileSync(jsonPath);
    // const writings = JSON.parse(jsonData);

    let writings = await Writing.find({})

    res.render('main', { list: writings });
});

app.get('/write', (req, res) => {
    res.render('write');
});

app.post('/write', async (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    // 자동저장 처리 const date = req.body.date;

    //mongoDB 로 저장
    const writing = new Writing({
        title: title,
        contents: contents
    });

    const result = await writing.save()
    .then(()=>{
        console.log('Success');
        res.render('detail', {title:title, contents:contents})
    }).catch((err)=>{
        console.error(err);
        res.render('write');
    })



    // ↓↓↓↓↓ data.json 에 저장관련 코드 주석처리
    // const json_fileData = fs.readFileSync(jsonPath);   //파일 읽기
    // // console.log(json_fileData);

    // const writings = JSON.parse(json_fileData);   //파일 변환
    // // console.log(writings);

    // // req 데이터 담아두기
    // writings.push({
    //     'title': title,
    //     'contents': contents,
    //     'date': date
    // });

    // // 담아둔 데이터 외부 json파일에 저장
    // fs.writeFileSync(jsonPath, JSON.stringify(writings));
    // res.render('detail', { 'detail': { title: title, contents: contents, date: date } });
    // ↑↑↑↑ data.json 에 저장관련 코드 주석처리

});


// DB연결
mongoose.connect('mongodb://127.0.0.1:27017')
    .then(() => console.log('DB 연결됨'))
    .catch(err => console.error(err));


// mongoose
const { Schema } = mongoose;
const writingSchema = new Schema({
    title: String,
    contents: String,
    date: { type: Date, default: Date.now }
});

const Writing = mongoose.model('writings', writingSchema);

app.get('/detail', async (req, res) => {
    res.render('detail');
})

app.listen(3000, () => {
    console.log('Server is running');
});