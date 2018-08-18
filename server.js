import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import createError from 'http-errors';


import allQuestionsRouter from './routes/questions';

const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// app.use(json({
//   type: 'application/json'
// }));

// app.use('/', (req, res) => {
//   res.send("Hello Express")
// })

app.use('/api/v1/users', allQuestionsRouter);

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