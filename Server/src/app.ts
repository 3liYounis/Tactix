import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import {router as routes} from './routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

export default app;
