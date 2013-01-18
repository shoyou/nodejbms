/**
 *
 * 组织机构数据
 * @author JY
 * @since 2012-04-28
 */
Ext.define('WMZ.store.Department', {
	extend: 'Ext.data.Store',
	requires: ['WMZ.model.Department'],
	model: 'WMZ.model.Department',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: '/department/find/',
		reader: {
			root: 'rows',
			totalProperty: 'total'
		}
	}
});