/**
 *  account.js 用户登录控制层
 *  @author: JY
 *  @since: 2012-11-08
 */
var models = require('../models');
var Account = models.Account;

var EventProxy = require('eventproxy').EventProxy;

exports.login = function (req, res, next) {
  res.render('account/login');
}

exports.index = function (req, res, next) {
  res.redirect('/', {'success': true});
}

exports.welcome = function (req, res, next) {
  res.render('account/index');
}
