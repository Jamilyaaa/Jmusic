const express = require('express');

const router = express.Router();

const sha256 = require('sha256');

const { User } = require('../db/models');

const {
  userChecker,
  deepCheckUser,
} = require('../middlewares/allMiddlewares');

router.get('/registration', (req, res) => {
  res.render('reg');
});

router.post('/registration', async (req, res) => {
  const {
    email, name,
  } = req.body;
  const password = sha256(req.body.password); // шифруем пароль
  if (!email || !name || !password) {
    return res.status(400).json({
      message:
        'Заполните, пожалуйста, все поля!',
    });
  }
  const existUser = await User.findOne({ where: { email }, raw: true });
  if (existUser) {
    return res.status(500).json({
      message:
        'пользователь с таким email уже существует',
    });
  }
  try {
    const user = await User.create({
      email,
      name,
      password,
    });
    req.session.userName = user.name; // записываем в сессию имя юзера, чтобы потмо его проверять (см в middlewares.js)
    req.session.userEmail = user.email;
    req.session.userId = user.id;
    res.json({ id: user.id });
    // res.redirect(`/users/lk/${user.id}`); // редирект на профиль нового юзера
  } catch (error) {
     res.status(400).json({ message: 'oops' });
  }
  // создаем нового юзера
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } }); // ищем в бд юзера по почте
    if (user.password === sha256(req.body.password)) {
      // если шифрованный пароль из бд совпадает с зашифрованным тем что ввел юзер
      req.session.userName = user.name; // записываем в сессию имя юзера, чтобы потмо его проверять (см middlewares.js)
      req.session.userEmail = user.email;
      req.session.userId = user.id;
      res.json({ id: user.id });
      // res.redirect(`/users/lk/${user.id}`);
    } else {
      res.status(400).json({ message: 'неверный пароль' });
    }
  } catch (error) {
    res.status(400).json({ message: 'ooops' });
  }
});


router.get('/logout', (req, res) => {
  // при logout сессия удаляется из папки sessions
  req.session.destroy();
  res.clearCookie('music_auth');
  res.redirect('/');
});

module.exports = router;
