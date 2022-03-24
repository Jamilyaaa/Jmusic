require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const logger = require('morgan');
const { addToLocals } = require('./middlewares/allMiddlewares');

const app = express();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const superRouter = require('./routes/superRouter');

// Middleware setup
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// вынести в отдельный файл
app.use(
  session({
    secret: process.env.SECRET ?? 'dsklfjghsldfhglsdufhglkjs',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    name: 'music_auth',
    store: new FileStore(), // хранилище для куков - папка с файлами
  }),
);

app.use(addToLocals);
// routes middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/text', superRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Server started on PORT :${process.env.PORT}`);
});

module.exports = app;

