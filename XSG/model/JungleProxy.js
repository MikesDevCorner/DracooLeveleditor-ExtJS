Ext.define('XSG.model.JungleProxy', {
    extend: 'Ext.data.proxy.Ajax',
    type: 'ajax',
	url: 'json/jungle.json',
	reader: {
		type: 'json',
		root: 'rigidBodies'
	}
});