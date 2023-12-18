"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const http = require("http");
const morgan = require("morgan");
const socket_io_1 = require("socket.io");
const dotenv = require("dotenv");
const ormconfig_1 = require("./ormconfig");
dotenv.config();
const { PORT } = process.env;
const app = express();
const corsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'origin, authorization, access-token, content-type',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
const logStream = fs.createWriteStream('error.log', { flags: 'a' });
app.use(morgan('dev'));
app.use(morgan('combined', {
    skip: (req, res) => res.statusCode !== 500,
    stream: logStream,
}));
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'MySecret',
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: false, sameSite: 'none' },
}));
app.use('/admin', require('./api/admin'));
app.use('/business', require('./api/business'));
app.use('/student', require('./api/student'));
app.use('/teacher', require('./api/teacher'));
app.use('/user', require('./api/user'));
const httpServer = http.createServer(app);
let io = new socket_io_1.Server(httpServer, { cors: corsOptions });
global.io = io;
ormconfig_1.AppDataSource.initialize()
    .then(() => {
    httpServer.listen(PORT, async function () {
        console.log('Connected ' + PORT + ' port!');
    });
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map