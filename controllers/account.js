/**
 *  account.js 用户账户控制层
 *  @author: JY
 *  @since: 2013-01-26
 */
var models = require('../models');
var Account = models.Account;
var EventProxy = require('eventproxy').EventProxy;

exports.findAccountInfo = function(req, res, next) {
    var proxy = new EventProxy();

    var render = function(data) {
        res.send({
            'success': true,
            'data': data
        });
    };

    proxy.assign('findAccountById', render);

    Account.findById(req.session.account['_id'], function(err, account) {
        if (err)
            return next(err);

        if (account != null) {
            var result = {};
            result['account'] = account['account'];
            result['username'] = account['username'];
            result['password2'] = account['password'];
            result['userid'] = account['_id'];
            proxy.trigger('findAccountById', result);
        } else {
            return;
        }
    });
}

exports.updAccountInfo = function(req, res, next) {
    var proxy = new EventProxy();

    var render = function(data) {
        res.send(data);
    };

    proxy.assign('updAccountInfo', render);

    var where = {};

    var userId = req.param('userid')
        , account = req.param('account')
        , password = req.param('password2')
        , username = req.param('username');

    where = {'_id': userId, 'password': password};
    Account.findOne(where, function(err, account) {
        if (err)
            return next(err);

        var result;
        if (account != null) {

            account.account = account;
            account.password = password;
            account.username = username;
            console.log(account+'dd');
            account.update(function(err) {
                if (err)
                    return next(err);
            });
            result = {'success': true};
        } else {
            result = {'success': false};
        }
        proxy.trigger('updAccountInfo', result);
    });
}