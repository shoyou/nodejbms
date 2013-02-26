/**
 *
 * 导航分页数据
 * @author JY
 * @since 2013-02-21
 */
Ext.define('WMZ.store.Page', {
	extend: 'Ext.data.ArrayStore',
	fields: ['value', 'text'],
	data: [
       [20, '20条/页'], 
       [50, '50条/页'],
       [100, '100条/页']
	]
});