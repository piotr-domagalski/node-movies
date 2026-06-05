import {createServer, IncomingMessage, ServerResponse} from "http";

let counter: number = 0;

console.log("starting http server");
createServer(function (req: IncomingMessage, res: ServerResponse) {
    counter++;
    console.log(`got a request. counter=${counter}`)
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`Hello World!\nThis was the ${counter}th request I got.`);
}).listen(8080);
