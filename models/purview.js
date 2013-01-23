/**
 *  purview.js 权限模型
 *  @author: JY
 *  @since: 2013-01-23
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleAuthoritySchema = new Schema({
    roleid: String,
    menuid: String,
    level: String
});

var MenuMapSchema = new Schema({
    userid: String,
    menuid: String,
    level: String
});

var AccountAuthoritySchema = new Schema({
    accountid: String,
    roleid: String
});

mongoose.model('RoleAuthority', RoleAuthoritySchema);
mongoose.model('MenuMap', MenuMapSchema);
mongoose.model('AccountAuthority', AccountAuthoritySchema);
