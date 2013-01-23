/**
 *  index.js 数据库配置索引页面 
 *  @author: JY
 *  @since: 2013-01-23
 */
var mongoose = require('mongoose');
var settings = require('../settings').settings;

mongoose.connect(settings.db, function (err) {
  if (err) {
    console.log('连接数据库出错: ', settings.db, err.message);
  }
});

// 加载模型
require('./department');
require('./account');
require('./customer');
require('./role');
require('./dictionary');
require('./menu');
require('./purview');

exports.Department = mongoose.model('Department');
exports.Account = mongoose.model('Account');
exports.Customer = mongoose.model('Customer');
exports.CustomerUnit = mongoose.model('CustomerUnit');
exports.CustomerDept = mongoose.model('CustomerDept');
exports.Role = mongoose.model('Role');
exports.Dictionary = mongoose.model('Dictionary');
exports.Menu = mongoose.model('Menu');
exports.RoleAuthority = mongoose.model('RoleAuthority');
exports.MenuMap = mongoose.model('MenuMap');
exports.AccountAuthority = mongoose.model('AccountAuthority');
