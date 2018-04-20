'use strict';
var config = require('../../server/config.json');
var path = require('path');
var senderAddress = "noreply@obdstudios.com"; // This should come from an environment variable.

module.exports = function (Users) {
  Users.on('resetPasswordRequest', function (info) {
    var url = 'http://' + config.host + ':' + config.port + '/auth/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
      info.accessToken.id + '">here</a> to reset your password';

    Users.app.models.Email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset request',
      html: html
    }, function (err) {
      if (err) return console.log('Error while sending password reset email');
      console.log('Sent password reset email to:', info.email);
    });

  });

  //send verification email after registration
  Users.afterRemote('create', function (context, user, next) {
    var options = {
      type: 'email',
      to: user.email,
      from: senderAddress,
      subject: 'Thank you for registering.',
      redirect: '/auth/verified',
      user: user
    };

    user.verify(options, function (err, response) {
      if (err) {
        Users.deleteById(user.id);
        return next(err);
      }

      context.res.send(user);
    });
  });

};
