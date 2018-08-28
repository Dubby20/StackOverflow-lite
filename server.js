import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import createError from 'http-errors';


import router from './routes/routes';

const app = express();
const port = process.env.PORT || 5000;
// const connectionString = 'postgres://forum:stackoverflow@localhost:5432/stackoverflowlitedb';


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/', (req, res) => res.json({
  message: 'Welcome to the Kodeland Forum'
}));

app.use('/api/v1', router);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;