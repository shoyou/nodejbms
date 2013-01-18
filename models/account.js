/**
 *  account.js 用户模型
 *  @author: JY
 *  @since: 2012-11-08
 */
require('./department');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Department = mongoose.model('Department');

var AccountSchema = new Schema({
    username: String,
    account: String,
    password: String,
    sex: String,
    dept: {type: Schema.Types.ObjectId, ref: 'Department'},
    locked: {type: Number, default: 0},
    remark: String,
    usertype: String,
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now}
});

mongoose.model('Account', AccountSchema);
