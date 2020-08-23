console.log("including file: MainContainer");

Ext.define('XSG.view.MainContainer', {
	requires: [
	    'Ext.layout.container.Border',
	    'Ext.resizer.Splitter',
	    'Ext.resizer.BorderSplitter',
	    'Ext.resizer.SplitterTracker',
	    'Ext.resizer.BorderSplitterTracker',
        'Ext.panel.Panel',
		'Ext.container.Container',
		'Ext.layout.container.Accordion',
		'XSG.view.MainToolbar',
		'XSG.view.LevelDetails',
		'XSG.view.LevelItems',
		'XSG.view.LevelToolbar'
	],
    extend: 'Ext.panel.Panel',
    border:false,
    alias: 'widget.maincontainer',
	bodyPadding:5,
    initComponent: function() {
        console.log("initializing  XSG-MainContainer");
		var me = this;

        Ext.applyIf(me, {
            style: 'background:#DFE8F6;',
            layout: 'border',
			tbar: {xtype:'maintoolbar'},
            items: [{
				xtype:'panel',
				flex:1,
				region:'center',
				id:'canvasHome',
				autoScroll:true,
				border:false,
				bodyStyle: {
					background: 'transparent',
					"border-right": "1px solid #99BCE8 !important",
					"border-bottom": "1px solid #99BCE8 !important"
				},
				header:false,
				html:'<div style="padding:15px;">no level canvas created yet...</div>',
				items:[]
			},{
				xtype:'panel',
				region:'west',
				hideCollapseTool:true,
				header:false,
				title:'Sidebar',
				layout:'accordion',
				split:true,
				minWidth:300,
				maxWidth:300,
				collapsible:true,
				width:300,
				items: [{xtype:'leveldetails'},{xtype:'levelitems'}]
			}]
        });

        me.callParent(arguments);
    }

});