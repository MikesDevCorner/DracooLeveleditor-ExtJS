console.log("including file: MainToolbar");


Ext.define('XSG.view.MainToolbar', {
	requires: [
		'Ext.toolbar.TextItem',
		'Ext.toolbar.Spacer',
		'Ext.form.field.ComboBox',
		'XSG.store.Levelpack'
	],
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.maintoolbar',
    initComponent: function() {
        console.log("initializing  XSG-MainToolbar");
		var me = this;

        Ext.applyIf(me, {
            items: [{
				xtype:'tbtext',
				style:'font-weight:bold;color:#04408C;',
				text:"Dracoo's Adventure - Level Editor",
				padding: '0 0 0 5'
			},{xtype:'tbspacer', width:15},'-',{
				xtype:'combobox',
				fieldLabel: 'Choose Levelpack',
				store: 'Levelpack',
				queryMode: 'local',
				displayField: 'levelpack',
				valueField: 'levelpack',
				editable:false
			},{xtype:'tbspacer', width:15},'-',{
				text:'Creator Mode',
				toggleGroup: "levelButtons",
				pressed:true,
				toggleHandler:function(btn, state) {
					if(state == true) creating = true;
					else creating = false;
				}
			},{
				text:'Erasor Mode',
				toggleGroup: "levelButtons",
				toggleHandler:function(btn, state) {
					if(state == true) erasing = true;
					else erasing = false;
				}
			},{
				text:'Editing Mode',
				toggleGroup: "levelButtons",
				toggleHandler:function(btn, state) {
					if(state == true) editing = true;
					else editing = false;
				}
			},'-',{xtype:'tbspacer', flex:1},'-',{
				text:'Load Level',
				iconCls:'download'
			},{
				text:'Push Level',
				iconCls:'upload'
			},{
				xtype:'numberfield',
				id:'levelnumber',
				width: 40,
				maxValue: 15,
				minValue: 1,
				value:1,
				allowDecimal:false,
				editable:false
			},'-',{xtype:'tbspacer', width:15},{
				text:'Load JSON',
				iconCls:'import'
			},{
				text:'Export JSON',
				iconCls:'export'
			},{
				text:'Try',
				iconCls:'play'			
			}]
        });

        me.callParent(arguments);
    }

});