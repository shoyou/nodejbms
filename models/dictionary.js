/**
 *  dictionary.js 字典模型
 *  @author: JY
 *  @since: 2013-01-23
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DictionarySchema = new Schema({
    field: String,
    fieldname: String,
    code: String,
    codedesc: String,
    enabled: String,
    editmode: String,
    sortno: String,
    remark: String
});

mongoose.model('Dictionary', DictionarySchema);
