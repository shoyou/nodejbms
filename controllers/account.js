/**
 *  account.js 用户账户控制层
 *  @author: JY
 *  @since: 2013-01-26
 */
var models = require('../models');
var Account = models.Account;
var EventProxy = require('eventproxy').EventProxy;

exports.findAccount = function(req, res, next) {
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

exports.updateAccount = function(req, res, next) {
    var proxy = new EventProxy();

    var render = function(data) {
        res.send(data);
    };

    proxy.assign('updateAccount', render);

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
        proxy.trigger('updateAccount', result);
    });
}

exports.saveAccount = function(req, res, next) {
    var proxy = new EventProxy();
    
    var account = new Account();
    account.account = req.param('account');
    account.password = req.param('password');
    account.username = req.param('username');
    
    var render = function(data) {
        res.send(data);
    }
    
    proxy.assign('saveAccount', render);
    account.save(function(err, account) {
        if (err)
            return next(err);
            
        proxy.trigger('saveAccount', {'success': true});
    });
}
    
exports.removeAccount = function(req, res, next) {
    var proxy = new EventProxy();
    
    var render = function(data) {
        res.send(data);
    }
    
    var id = req.param('id');
    proxy.assign('removeAccount', render);
    
    Account.remove({'_id', id}, function(err) {
        if (err)
            return next(err);
            
        proxy.trigger('removeAccount', {'success': true});
    });  
}
