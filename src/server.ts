import express from 'express';
import dotenv from 'dotenv'
import { router } from './routes/viewRouter';
import bodyParser from 'body-parser';
import morgan from 'morgan';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(router);

app.listen(443, () => {
    console.log(`http://localhost:${port}`)
})