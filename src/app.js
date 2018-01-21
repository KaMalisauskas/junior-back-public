import express from 'express';
import expressValidator from 'express-validator';
import connect from './db/connect';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import bodyParser from 'body-parser';
import Api_router from './routes/auth_router';
import Job_router from './routes/job_router';

const app = express();


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());
app.use(mongoSanitize());

app.get('/', (req, res) => {
  res.status(200).send({
      Welcome: "To Karolis Api"
  });
});

app.use('/api/auth', Api_router);
app.use('/api/job', Job_router);

module.exports = app;