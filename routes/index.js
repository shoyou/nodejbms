
/*
 * GET home page.
 */

var account = require('../controllers/account');
/*
exports.index = function(req, res){
  res.render('account/login', { title: 'Express' });
};*/
module.exports = function (app) {
  // µÇÂ¼Ò³Ãæ
  app.get('/', account.login);
  // µÇÂ¼Ìá½»
  app.post('/account/index', account.index);
  app.get('/index', account.welcome);
}
