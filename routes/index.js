const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('index', {
    title: 'Добро пожаловать в наш !',
    user: { id: req.session.userId },
  });
});

module.exports = router;
