/**
 *  account.js 用户账户控制层
 *  @author: JY
 *  @since: 2013-01-26
 */
var models = require('../models');
var Account = models.Account;
var EventProxy = require('eventproxy').EventProxy;

exports.updatepwd = function(req, res, next) {
    var proxy = new EventProxy();

    var render = function(data) {
        res.send(JSON.stringify(data));
    };

    proxy.assign('findAccountById', render);

    Account.findOne({'_id': req.session.account['_id']}, function(err, account) {
        if (err)
            return next(err);

        if (account != null) {
            var result = {};
            result['account'] = 'account';
            result['username'] = 'account';
            result['password2'] = 123;
            proxy.trigger('findAccountById', result);
        } else {
            return;
        }
    });
}