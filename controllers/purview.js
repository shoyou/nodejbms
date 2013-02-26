/**
 *  purview.js 权限控制层
 *  @author: JY
 *  @since: 2013-02-21
 */
var models = require('../models');
var Menu = models.Menu;
var EventProxy = require('eventproxy').EventProxy;

exports.findMenu = function(req, res, next) {
    var proxy = new EventProxy();

    var render = function(data) {
        res.send({
            'success': true,
            'data': data
        });
    };

    proxy.assign('findMenu', render);

    //var result = {expanded: true,children: [{ text: "detention", leaf: true }, { text: "homework", expanded: true, children: [{ text: "book report", leaf: true },{ text: "alegrbra", leaf: true}]}]};
    var result = null;
    if (2 > 1) {
        proxy.trigger('findMenu', result);
    }

}