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
            console.log('DDD');
            res.render('account/index', {title: '晚上好'});
        };

        proxy.assign('findAccount', render);

        var where = {};
        where = {'account': account,'password': password};

        ad = new Account();
        ad.account = 'ggod';
        ad.password = 'dd';
        ad.save(function (err) {
            if (err)
                return next(err);
        });
        if (account && password) {
            Account.find(where, function(err, account) {
                if (err)
                   return next(err);
                console.log(account+'知道');
                if (!account) {
                    return res.redirect('/login');
                } else {
                    proxy.trigger('findAccount', account);
                }
            });
        }
        //res.redirect('/', {'success': true});
    }
};

exports.logout = function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
};