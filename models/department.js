/**
 *  department.js 部门模型
 *  @author: JY
 *  @since: 2012-11-08
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
    deptname: String,
    parent: {type: Schema.Types.ObjectId, ref: 'Department'},
    deptno: String,
    leaf: String,
    remark: String,
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    locked: {type: Number, default: 0}
});

var Department = mongoose.model('Department', DepartmentSchema);
