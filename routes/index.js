
/*
 * GET home page.
 */

var account = require('../controllers/account');
/*
exports.index = function(req, res){
  res.render('account/login', { title: 'Express' });
};*/
module.exports = function (app) {
  // ��¼ҳ��
  app.get('/', account.login);
  // ��¼�ύ
  app.post('/account/index', account.index);
  app.get('/index', account.welcome);
}
