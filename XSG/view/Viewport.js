console.log("including file: Viewport");

Ext.define('XSG.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.xsgviewport',
	layout:'fit',
	border:false,
    initComponent: function() {
		console.log("XSG-Viewport initialized");
        var me = this;
        Ext.applyIf(me, {
            items: [Ext.create('XSG.view.MainContainer')]
        });
        me.callParent(arguments);
    }
});