const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: 'User created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth Failed!'
      })
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth Failed!'
      })
    }
    const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
      'L^L^gdw?xc@WMZ&}8,A6c~sU4-',
      {expiresIn: '2h' });
      res.status(200).json({
        token: token,
        userId: fetchedUser._id
      });
  })
  .catch(err => {
    return res.status(401).json({
      messsagem: 'Auth Failed!'
    })
  });
});

router.get('/listar', (req, res, next) => {
  const userQuery = User.find({id: req.body.id});
  let usersAdq;
    userQuery
    .then(documents => {
      usersAdq = documents;
      return User.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: 'Users fetch com Sucesso',
        users: usersAdq,
        maxUsers: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Erro fetch Users'
    });
  });
});

router.delete('/listar/:id', (req, res, next) => {
  console.log(req.body.id);

  User.deleteOne({id: req.body.id}).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: 'Utilizador deletado com Sucesso'});
    } else {
      res.status(401).json({
        message: 'erro delete user'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'erro delete user'
    });
  });
});

module.exports = router;
