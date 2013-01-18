/**
 *
 * 组织机构数据模型
 * @author JY
 * @since 2012-04-28
 */
Ext.define('WMZ.model.Department', {
	extend: 'Ext.data.Model',
	fields: ['id', 'deptname', 'parentid', 'customid', 'remark']
});
