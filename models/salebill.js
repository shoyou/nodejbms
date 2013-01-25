/**
 *  salebill.js 立项单模型
 *  @author: JY
 *  @since: 2013-01-24
 */
require('./department');
require('./account');
require('./customer');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Department = mongoose.model('Department');
var Account = mongoose.model('Account');
var Customer = mongoose.model('Customer');

var SaleBillSchema = new Schema({
    project_name: String,
    project_no: String,
    submit_state: String,
    dept: {type: Schema.Types.ObjectId, ref: 'Department'},
    responsible: {type: Schema.Types.ObjectId, ref: 'Account'},
    sale_level: String,
    project_state: String,
    customers: [{ type: Schema.Types.ObjectId, ref: 'Customer' }],
    project_date: {type: Date, default: Date.now},
    predict_starttime: {type: Date, default: Date.now},
    predict_endtime: {type: Date, default: Date.now},
    project_describe: String,
    final_name: String,
    create_id: {type: Number},
    sale_state: String,
    history_state: String,
    sale_area: String,
    sale_address: {
      sale_province: String,
      sale_city: String,
      sale_district: String
    },
    update_record: String,
    update_id: String,
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    locked: {type: Number, default: 0}
});

mongoose.model('SaleBill', SaleBillSchema);
