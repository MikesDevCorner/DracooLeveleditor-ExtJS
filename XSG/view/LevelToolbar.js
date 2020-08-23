console.log("including file: LevelToolbar");

Ext.define('XSG.view.LevelToolbar', {
	requires: [
		'Ext.toolbar.TextItem'
	],
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.leveltoolbar',
    initComponent: function() {
        console.log("initializing  XSG-LevelToolbar");
		var me = this;

        Ext.applyIf(me, {
			height: 28,
            items: [{
				xtype:'tbtext',
				text:"<b>Level</b>",
			}]
        });

        me.callParent(arguments);
    }

});