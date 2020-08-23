Ext.define('XSG.model.BatmineProxy', {
    extend: 'Ext.data.proxy.Ajax',
    type: 'ajax',
	url: 'json/batmine.json',
	reader: {
		type: 'json',
		root: 'rigidBodies'
	}
});