/**
 *  role.js 用户模型
 *  @author: JY
 *  @since: 2013-01-22
 */
require('./department');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Department = mongoose.model('Department');

var RoleSchema = new Schema({
    rolename: String,
    roletype: String,
    dept: {type: Schema.Types.ObjectId, ref: 'Department'},
    remark: String,
    locked: {type: Number, default: 0},
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now}
});

mongoose.model('Role', RoleSchema);
