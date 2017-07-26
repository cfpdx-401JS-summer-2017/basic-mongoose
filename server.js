const http = require('http');
require('./lib/connect');
const app = require('./lib/app');

const server = http.createServer(app);

const port = 3000;

server.listen(port, () => {
    // eslint-disable-next-line
    console.log('server up and running on', server.address().port);
});