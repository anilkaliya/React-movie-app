const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");
const port=3001;

app.set( 'port', port );

const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`connected to server on port ${port}`);
});
