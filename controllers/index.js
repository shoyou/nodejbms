/**
 *  index.js 首页控制层
 *  @author: JY
 *  @since: 2013-01-26
 */
exports.index = function (req, res, next) {
    console.log('Account '+req.session.is_login);
    if (req.session.is_login) {
        res.render('account/index');
    } else {
        res.render('account/login');
    }
}