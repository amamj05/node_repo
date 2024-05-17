const http = require('http');

const server_cjs = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.write('hello node.js "CJS"');
    res.end();
})

server_cjs.listen(3000, ()=> {
    console.log('Server is listening on port 3000');
})


// 현재 위치로 이동 : cd 폴더위치 
// 실행 : node 파일이름

//cd .\server_CJS
//node server_cjs.js