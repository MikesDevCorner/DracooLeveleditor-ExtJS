console.log("including file: ItemGrid");

Ext.define('XSG.view.ItemGrid', {
	requires: [
	   "XSG.store.PackItems",
	   "Ext.grid.plugin.CellEditing"
	],
    extend: 'Ext.grid.Panel',
    border:false,
    alias: 'widget.itemgrid',
    initComponent: function() {
        console.log("initializing  XSG-ItemGrid");
		var me = this;

        Ext.applyIf(me, {
			store:'PackItems',
			plugins: [{ptype: 'cellediting', clicksToEdit: 2}],
			bodyStyle:'border-top-width:0!important;',
			hideHeaders:true,
            columns: [
				{ text: 'Name',  flex:1, dataIndex: 'name'},
				{ text: 'Type',  flex:1, dataIndex: 'type'}
			]            
        });

        me.callParent(arguments);
    }

});