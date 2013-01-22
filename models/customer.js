/**
 *  customer.js 客户模型
 *  @author: JY
 *  @since: 2013-01-21
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerUnitSchema = new Schema({
    unitname: String,
    shortname: String,
    phone: String,
    fax: String,
    address: String,
    code: String,
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    locked: {type: Number, default: 0}
});

var CustomerDeptSchema = new Schema({
    deptname: String,
    deptphone: String,
    unit: {type: Schema.Types.ObjectId, ref: 'CustomerUnit'},
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    locked: {type: Number, default: 0}
});

var CustomerSchema = new Schema({
    custname: String,
    unit: {type: Schema.Types.ObjectId, ref: 'CustomerUnit'},
    dept: {type: Schema.Types.ObjectId, ref: 'CustomerDept'},
    position: String,
    duty: String,
    tel: String,
    phone: String,
    fax: String,
    mail: String,
    remark: String,
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    locked: {type: Number, default: 0}
});

var CustomerUnit = mongoose.model('CustomerUnit', CustomerUnitSchema);
var CustomerDept = mongoose.model('CustomerDept', CustomerDeptSchema);
mongoose.model('Customer', CustomerSchema);
