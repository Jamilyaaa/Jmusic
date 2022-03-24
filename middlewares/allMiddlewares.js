// пропускает пользователя, если он авторизован (т.е если есть ключ name в сессии) или редиректит на главную, если он
//авторизован (т.е если есть ключ name в сессии) или редиректит на главную, если он не авторизован (см стр 11 в index.js роутере )

const userChecker = (req, res, next) => {
  if (req.session.userName) {
    // проверяем есть ли в сессии userName (см в reg.js router)
    return next();
  }
  res.redirect("/users/login");
};
const deepCheckUser = (req, res, next) => {
  console.log(req.session.userId, req.params.id);
  if (Number(req.session.userId) === Number(req.params.id)) {
    // сравниваем id юзера и id профиля на который он хочет попасть
    next();
  } else {
    res.redirect(`/users/lk/${req.session.userId}`); // редиректим юзера всегда на свой профиль при попытке перейти на чужой
  }
};

const addToLocals = (req, res, next) => {
  // записываем в locals данные из сессии чтобы они были доступны в hbs
  res.locals.userId = req.session?.userId;
  // строка 31 это optional channing делает она тоже самое
  // тоже, что и строка 34 - 36 это синтаксически тоже самое
  if (req.session) {
    res.locals.userName = req.session.userName;
  }
  next();
};

module.exports = { userChecker, deepCheckUser, addToLocals };
