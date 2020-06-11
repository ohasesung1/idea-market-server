import express from 'express';
import HTTP from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import * as colorConsole from './lib/console';
import api from './api';

dotenv.config();

const port = process.env.PORT;

const app = express();

const server = HTTP.createServer(app);

app.use(cors())
  .use(express.json());

app.use('/', api);

server.listen(port, () => {
  colorConsole.green(`Server Listening to port => ${port}`);
});
