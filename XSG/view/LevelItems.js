console.log("including file: LevelItems");

Ext.define('XSG.view.LevelItems', {
	requires: [
	   'Ext.layout.container.VBox',
	   'XSG.view.ItemPicture',
	   'XSG.view.ItemGrid'
	],
    extend: 'Ext.panel.Panel',
    border:false,
    alias: 'widget.levelitems',
    initComponent: function() {
        console.log("initializing  XSG-LevelItems");
		var me = this;

        Ext.applyIf(me, {
            layout: {
				type: 'vbox',
				align: 'stretch'
			},
			title:'<b>Level Items</b>',
            items: [{
				xtype:'itemgrid',
				flex:1
			},{
				xtype:'itempicture',
				height:300
			}]
        });

        me.callParent(arguments);
    }

});