/**
 *  index.js 数据库配置索引页面 
 *  @author: JY
 *  @since: 2012-11-08
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

exports.Department = mongoose.model('Department');
exports.Account = mongoose.model('Account');
