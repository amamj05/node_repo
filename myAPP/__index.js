import {createServer} from 'http';

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.write('hello node.js "ESM" <express> ');
    res.end();
})

server.listen(3000, ()=> {
    console.log('Server is listening on port 3000');
})


// 현재 위치로 이동 : cd 폴더위치 
// 실행 : node 파일이름

//cd \myAPP
//node index.js