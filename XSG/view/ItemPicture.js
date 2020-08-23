console.log("including file: ItemPicture");

Ext.define('XSG.view.ItemPicture', {
	requires: [
	   
	],
    extend: 'Ext.panel.Panel',
    border:false,
    alias: 'widget.itempicture',
    initComponent: function() {
        console.log("initializing  XSG-ItemPicture");
		var me = this;

        Ext.applyIf(me, {
			style:'border-top:1px solid #99bce8 !important;',
			bodyStyle:'background:#EFEFEF;',
            title:'Picture',
			autoScroll:true,
			//layout:'fit',
			items: [{xtype:'image', src:''}]
        });

        me.callParent(arguments);
    }

});