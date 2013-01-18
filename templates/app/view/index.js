﻿/**
 *
 * 系统首页界面
 * @author JY
 * @since 2012-11-08
 */
Ext.Loader.setConfig({enabled:true});
// 设置动态加载路径 命名空间
Ext.Loader.setPath('WMZ', '');
Ext.onReady(function() {

    Ext.tip.QuickTipManager.init();

    // 应用主题模式
    Ext.create('Ext.Button', {
        text: '主题',
        iconCls: 'themeIcon',
        iconAlign: 'left',
        scale: 'medium',
        width: 60,
        tooltip: '<span style="font-size:12px">切换系统主题样式</span>',
        pressed: true,
        arrowAlign: 'right',
        renderTo: 'themeDiv',
        handler: function() {
			themeWindowInit();
		}
    });
        
    var mainMenu = Ext.create('Ext.menu.Menu', {
        id: 'mainMenu',
        items: [{
            text: '密码修改',
            iconCls: 'keyIcon',
            handler: function() {
                updateUserInit();
            }
        }, {
            text : '系统锁定',
            iconCls : 'lockIcon',
            handler : function() {
                lockWindow.show();
                setCookie("g4.lockflag", '1', 240);
            }
        }]
    });

    Ext.create('Ext.Button', {
        text: '首选项',
        iconCls: 'config2Icon',
        iconAlign: 'left',
        scale: 'medium',
        width: 85,
        tooltip: '<span style="font-size:12px">首选项设置</span>',
        pressed: true,
        renderTo: 'configDiv',
        menu: mainMenu
    });

    Ext.create('Ext.Button', {
        iconCls: 'cancel_48Icon',
        iconAlign: 'left',
        scale: 'medium',
        width: 30,
        tooltip: '<span style="font-size:12px">切换用户,安全退出系统</span>',
        pressed: true,
        arrowAlign: 'right',
        renderTo: 'closeDiv',
        handler: function() {
            window.location.href = '/?reqCode=logout';
        }
    });
    
    var micolor = "width:70px;color:blue;";
    // 修改密码Form表单
    var userFormPanel = Ext.create('Ext.form.Panel', {
        defaultType: 'textfield',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 70
        },
        frame: false,
        bodyStyle: 'padding:5px 5px 0px',
        items: [{
            fieldLabel: '登录帐户',
            name: 'account',
            id: 'account',
            allowBlank: false,
            readOnly: true,
            fieldClass: 'x-custom-field-disabled',
            anchor: '99%'
        }, {
            fieldLabel: '姓名',
            name: 'username',
            id: 'username',
            allowBlank: false,
            readOnly: true,
            fieldClass: 'x-custom-field-disabled',
            anchor: '99%'
        }, {
            fieldLabel: '当前密码',
            name: 'password2',
            id: 'password2',
            inputType: 'password',
            labelStyle: micolor,
            maxLength: 50,
            allowBlank: false,
            anchor: '99%'
        }, {
            fieldLabel: '新密码',
            name: 'password',
            id: 'password',
            inputType: 'password',
            labelStyle: micolor,
            maxLength: 50,
            allowBlank: false,
            anchor: '99%'
        }, {
            fieldLabel: '确认新密码',
            name: 'password1',
            id: 'password1',
            inputType: 'password',
            labelStyle: micolor,
            maxLength: 50,
            allowBlank: false,
            anchor: '99%'
        }, {
            id: 'userid',
            name: 'userid',
            hidden: true
        }]
    });
    
    /**
     * 加载当前登录用户信息
     */
    function updateUserInit() {
        userFormPanel.form.reset();
        
        // 查询当前用户的信息
        userWindow.on('show', function() {
            setTimeout(function() {
                userFormPanel.form.load({
                    waitTitle: '提示',
                    waitMsg: '正在读取用户信息,请稍候...',
                    url: '/account/updatepwd/?reqCode=loadUserInfo',
                    success: function(form, action) {
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('提示','数据读取失败:'+ action.failureType);
                    }
                });
            }, 5);
        });
        userWindow.show();
    }

    var userWindow = Ext.create('Ext.window.Window', {
        layout: 'fit',
        width: 300,
        height: 205,
        resizable: false,
        draggable: true,
        closeAction: 'hide',
        modal: true,
        title: '<span class="commoncss">密码修改</span>',
        iconCls: 'keyIcon',
        collapsible: true,
        titleCollapse: true,
        maximizable: false,
        buttonAlign: 'right',
        border: false,
        //animCollapse: true,
        //animateTarget: Ext.getBody(),
        constrain: true,
        listeners: {
            'show': function(obj) {
                Ext.getCmp('password2').focus(true,200);
            }
        },
        items: [userFormPanel],
        buttons: [{
            text: '保存',
            iconCls: 'acceptIcon',
            handler: function() {
                if (runMode == '0') {
                    Ext.Msg.alert('提示', '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                    return;
                }
                //updateUser();
            }
            }, {
                text: '关闭',
                iconCls: 'deleteIcon',
                handler: function() {
                    userWindow.close();
                }
            }
        ]
    });
    
    var lockForm = Ext.create('Ext.panel.Panel', {
        defaultType: 'textfield',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 60
        },
        bodyStyle: 'padding:10px 5px 5px 5px', 
        layout: 'column',
        items: [{
            fieldLabel: '帐户密码',
            name: 'password',
            inputType: 'password',
            id: 'password_lock',
            labelStyle: micolor,
            allowBlank: false,
            maxLength: 50,
            listeners: {
                specialkey: function(field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        unlockSystem();
                    }
                }
            },
            anchor: '100%'
        }, {
            xtype: 'panel',
            border: false,
            html: '<div style="font-size:12px;margin-left:10px">(提示:系统已成功锁定,解锁请输入登录帐户密码)</div>'
        }]
    });
    
    /**
     * 锁定用户
     */
    var lockWindow = Ext.create('Ext.window.Window', {
        title: '<span class="commoncss">系统锁定</span>',
        iconCls: 'lockIcon',
        layout: 'fit',
        width: 320,
        height: 130,
        closeAction: 'hide',
        collapsible: false,
        closable: false,
        maximizable: false,
        border: false,
        modal: true,
        constrain: true,
        animateTarget: Ext.getBody(),
        items: [lockForm],
        listeners: {
            'show': function(obj) {
                lockForm.form.reset();
                //lockForm.findField('password_lock').focus(true, 50);
            }
        },
        buttons: [
            {
                text: '解锁',
                iconCls: 'keyIcon',
                handler: function() {
                    unlockSystem();
                }
            }, {
                text: '重新登录',
                iconCls: 'tbar_synchronizeIcon',
                handler: function() {
                    window.location.href = '/?reqCode=logout';
                }
            }
        ]
    });

    /**
     * 创建整体布局
     */
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        renderTo: Ext.getBody(),
        items: [
            Ext.create('Ext.panel.Panel', {
                region:'north',
                contentEl:'north', 
                //iconCls:'application_homeIcon', 
                height:85,
                collapsible:true,
                border:false,
                layout: 'fit',
                title:'学无止境 奋斗不息'
            })
        , Ext.create('WMZ.view.layout.West')
        , Ext.create('Ext.container.Container', {
            region: 'south',
            contentEl: 'south',
            collapsible: true,
            height: 20,
            layout: 'fit'
         })
        ,Ext.create('WMZ.view.layout.Center')
        ]
    });
    
    // 动态显示系统时间
    setInterval("showTime()", 1000);
    Ext.QuickTips.init();
});

/**
 * 显示系统时钟
 */
function showTime() {
	var date = new Date();
	var h = date.getHours();
	h = h < 10 ? '0' + h : h;
	var m = date.getMinutes();
	m = m < 10 ? '0' + m : m;
	var s = date.getSeconds();
	s = s < 10 ? '0' + s : s;
	document.getElementById('rTime').innerHTML = h + ":" + m + ":" + s;
}

/**
 * 加载完成移除遮罩层
 */
Ext.EventManager.on(window, 'load', function(){
    setTimeout(
        function() {
            Ext.get('loading').remove();
            Ext.get('loading-mask').fadeOut({remove:true});
        }, 250); 
});

