const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('index', {
    user: { id: req.session.userId },
  });
});

module.exports = router;
