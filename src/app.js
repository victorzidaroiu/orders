import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import _debug from 'debug';
import routes from './routes';

dotenv.config({ silent: true });
const debug = _debug('server');
const app = express();

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    debug('mongodb connection error', err);
  } else {
    debug('mongodb connection successful');
  }
});

app.set('views', './src/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));
app.use(routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

export default app;
