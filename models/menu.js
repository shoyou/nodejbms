/**
 *  menu.js 菜单模型
 *  @author: JY
 *  @since: 2013-01-23
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MenuSchema = new Schema({
    menuname: String,
    parentid: {type: Schema.Types.ObjectId, ref: 'Menu'},
    iconcls: String,
    expanded: String,
    request: String,
    leaf: String,
    sortno: {type: Number},
    remark: String,
    icon: String,
    menutype: {type: Number},
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    locked: {type: Number, default: 0}
});

var Menu = mongoose.model('Menu', MenuSchema);
