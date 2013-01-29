/**
 *  login.js 用户登录控制层
 *  @author: JY
 *  @since: 2013-01-26
 */
var crypto = require('crypto')
    , EventProxy = require('eventproxy').EventProxy;

var models = require('../models');
var Account = models.Account;

exports.index = function (req, res, next) {
    if (req.session.is_login) {
        res.redirect('/');
    } else {
        var proxy = new EventProxy()
            , account = req.body.account.trim()
            , password = req.body.password.trim();

        var render = function(data) {
            res.redirect('/', {'success': true});
        };

        proxy.assign('findAccount', render);

        var where = {};
        where = {'account': account, 'password': password};

        if (account && password) {
            Account.findOne(where, function(err, account) {
                if (err)
                   return next(err);
                console.log(account+'aaa');
                if (account != null) {
                    req.session.is_login = true;
                    req.session.account = account;
                    proxy.trigger('findAccount', account);
                } else {
                    res.send({'success': false, 'msg': '用户名或密码错误!'});
                }
            });
        }
    }
}

exports.logout = function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
}