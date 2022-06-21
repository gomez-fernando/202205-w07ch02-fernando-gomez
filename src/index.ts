import http from 'http';


const PORT = process.env.PORT || 3200;



const server = http.createServer();
server.listen(PORT);
console.log('Server ON');

