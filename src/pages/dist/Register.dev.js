"use strict";

var path = require('path');

var fs = require('fs');

var jsonServer = require('json-server');

var jwt = require('jsonwebtoken');

var server = jsonServer.create();
var router = jsonServer.router(path.join(__dirname, 'db.json'));
var middleWares = jsonServer.defaults();
server.use(jsonServer.bodyParser);
server.use(middleWares);

var getUsersDb = function getUsersDb() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'UTF-8'));
};

var isAuthenticated = function isAuthenticated(_ref) {
  var email = _ref.email,
      password = _ref.password;
  return getUsersDb().users.findIndex(function (user) {
    return user.email === email && user.password === password;
  }) !== -1;
};

var isExist = function isExist(email) {
  return getUsersDb().users.findIndex(function (user) {
    return user.email === email;
  }) !== -1;
};

var SECRET = '12321JKLSJKLSDFJK23423432';
var expiresIn = '1h';

var createToken = function createToken(payload) {
  return jwt.sign(payload, SECRET, {
    expiresIn: expiresIn
  });
};

server.post('/auth/login', function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

  if (isAuthenticated({
    email: email,
    password: password
  })) {
    var user = getUsersDb().users.find(function (u) {
      return u.email === email && u.password === password;
    });
    var nickname = user.nickname,
        type = user.type; // jwt

    var jwToken = createToken({
      nickname: nickname,
      type: type,
      email: email
    });
    return res.status(200).json(jwToken);
  } else {
    var status = 401;
    var message = 'Incorrect email or password';
    return res.status(status).json({
      status: status,
      message: message
    });
  }
}); // Register New User

server.post('/auth/register', function (req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password,
      nickname = _req$body2.nickname,
      type = _req$body2.type; // ----- 1 step

  if (isExist(email)) {
    var status = 401;
    var message = 'Email already exist';
    return res.status(status).json({
      status: status,
      message: message
    });
  } // ----- 2 step


  fs.readFile(path.join(__dirname, 'users.json'), function (err, _data) {
    if (err) {
      var _status = 401;
      var _message = err;
      return res.status(_status).json({
        status: _status,
        message: _message
      });
    } // Get current users data


    var data = JSON.parse(_data.toString()); // Get the id of last user

    var last_item_id = data.users[data.users.length - 1].id; //Add new user

    data.users.push({
      id: last_item_id + 1,
      email: email,
      password: password,
      nickname: nickname,
      type: type
    }); //add some data

    fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(data), function (err, result) {
      // WRITE
      if (err) {
        var _status2 = 401;
        var _message2 = err;
        res.status(_status2).json({
          status: _status2,
          message: _message2
        });
        return;
      }
    });
  }); // Create token for new user

  var jwToken = createToken({
    nickname: nickname,
    type: type,
    email: email
  });
  res.status(200).json(jwToken);
});
/**
request headers --> Authorization
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJuaWNrbmFtZSI6ImFkbWluIiwidHlwZSI6MSwiZW1haWwiOiJhZG1pbkAxNjMuY29tIiwiaWF0IjoxNTcyNzU3MjAzLCJleHAiOjE1NzI3NjA4MDN9
.f4hfN1IjU4E23Lo44N-2VLzc1qoyNu1oZg2iQreZTfU
*/
// server.use(/^(?!\/auth).*$/, (req, res, next) => {
// server.use(['/carts'], (req, res, next) => {

server.use('/carts', function (req, res, next) {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    var status = 401;
    var message = 'Error in authorization format';
    res.status(status).json({
      status: status,
      message: message
    });
    return;
  }

  try {
    var verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      var _status3 = 401;
      var _message3 = 'Access token not provided';
      res.status(_status3).json({
        status: _status3,
        message: _message3
      });
      return;
    }

    next();
  } catch (err) {
    var _status4 = 401;
    var _message4 = 'Error token is revoked';
    res.status(_status4).json({
      status: _status4,
      message: _message4
    });
  }
}); // Verify the token

var verifyToken = function verifyToken(token) {
  return jwt.verify(token, SECRET, function (err, decode) {
    return decode !== undefined ? decode : err;
  });
};

server.use(router);
server.listen(3003, function () {
  console.log('JSON Server is running');
});