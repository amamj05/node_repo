import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
//file을 다룰수 있는 fs (/data/writing.json)
import fs from 'fs';
import path from 'path';

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
    const jsonData = fs.readFileSync(jsonPath);
    const writings = JSON.parse(jsonData);
    res.render('main', {list:writings});
});

app.get('/write', (req, res) => {
    res.render('write');
});

app.post('/write', async (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    const date = req.body.date;

    const json_fileData = fs.readFileSync(jsonPath);   //파일 읽기
    // console.log(json_fileData);

    const writings = JSON.parse(json_fileData);   //파일 변환
    // console.log(writings);

    // req 데이터 담아두기
    writings.push({
        'title': title,
        'contents': contents,
        'date': date
    });

    
    // 담아둔 데이터 외부 json파일에 저장
    fs.writeFileSync(jsonPath, JSON.stringify(writings));

    res.render('detail', { 'detail': { title: title, contents: contents, date: date } });
});

app.get('/detail', async (req, res) => {
    res.render('detail');
})

app.listen(3000, () => {
    console.log('Server is running');
});