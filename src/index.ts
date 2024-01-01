import * as express from 'express';
import * as session from 'express-session';
import * as cors from 'cors';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';
import * as morgan from 'morgan';
import { Server } from 'socket.io';
import * as dotenv from 'dotenv'
import { AppDataSource } from './ormconfig';
dotenv.config()

const { PORT } = process.env;

const app = express();

//  --------------- PRODUCTION --------------------------------
// const corsOptions = {
//     origin: 'https://itw.vercel.app',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'origin, authorization, access-token, content-type',
//     credentials: true,
// };


// ---------------- DEPLOYMENT ------------------------------
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'origin, authorization, access-token, content-type',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
const logStream = fs.createWriteStream('error.log', { flags: 'a' });

app.use(morgan('dev'));
app.use(
    morgan('combined', {
        skip: (req, res) => res.statusCode !== 500,
        stream: logStream,
    }),
);

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'MySecret',
        resave: true,
        saveUninitialized: true,
        cookie: { httpOnly: true, secure: false, sameSite: 'none' },
    }),
);

// api
app.use('/api/v1/admin', require('./api/admin'));
app.use('/api/v1/business', require('./api/business'));
app.use('/api/v1/student', require('./api/student'));
app.use('/api/v1/teacher', require('./api/teacher'));
app.use('/api/v1/user', require('./api/user'));
app.use('/api/v1/chat', require('./api/chat'));

const httpServer = http.createServer(app);

let io = new Server(httpServer, { cors: corsOptions });

declare global {
    var io: Server;
}
global.io = io;

AppDataSource.initialize()
    .then(() => {
        httpServer.listen(PORT, async function () {
            // const cs = new ChatService();
            // cs.deleteAllSocketData();
            console.log('Connected ' + PORT + ' port!');
        });

        // io = require('./chat/io');
    })
    .catch((error) => console.log(error));
