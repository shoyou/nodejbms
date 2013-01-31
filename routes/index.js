/**
 *  index.js 路由选择规则
 *  @author: JY
 *  @since: 2013-01-25
 */
var account = require('../controllers/account')
    , index = require('../controllers/index')
    , login = require('../controllers/login');

module.exports = function (app) {

    app.get('/', index.index);
    app.get('/index', index.index);

    app.post('/login', login.index);
    app.get('/logout', login.logout);

    app.post('/account/findAccountInfo', account.findAccountInfo);
    app.post('/account/updAccountInfo', account.updAccountInfo);
}
