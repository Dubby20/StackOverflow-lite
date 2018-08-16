import express from 'express';
import {
  json,
  urlencoded
} from 'body-parser';
import logger from 'morgan';
import createError from 'http-errors';

import allQuestionsRouter from './routes/questions';

const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({
  extended: false
}));

app.use('/questions', allQuestionsRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

export default app;