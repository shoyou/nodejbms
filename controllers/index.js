/**
 *  index.js 首页控制层
 *  @author: JY
 *  @since: 2013-01-26
 */
exports.index = function (req, res, next) {
    if (req.session.is_login) {
        var hour = (new Date()).getHours();
        var timeMsg;

        if (hour >= 6 && hour < 12) {
            timeMsg = "上午好!";
        } else if (hour >= 12 && hour < 18) {
            timeMsg = "下午好!";
        } else {
            timeMsg = "晚上好!";
        }

        res.render('account/index', {
            account: req.session.account,
            welcomeMsg: timeMsg
        });
    } else {
        res.render('account/login');
    }
}
