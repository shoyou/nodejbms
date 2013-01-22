/**
 *  role.js 用户模型
 *  @author: JY
 *  @since: 2013-01-22
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    rolename: String,
    remark: String,
    locked: {type: Number, default: 0},
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now}
});

mongoose.model('Role', RoleSchema);
