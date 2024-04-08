import Server from "./server.js";

const server = new Server();
server.routes();
server.middleware();
server.on();
server.listen();