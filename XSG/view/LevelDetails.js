console.log("including file: LevelDetails");

Ext.define('XSG.view.LevelDetails', {
	requires: [
	   'Ext.layout.container.Form',
	   'Ext.form.field.Number',
	   'Ext.form.field.Checkbox',
	   'Ext.form.field.Text',
	   'Ext.button.Button'
	],
    extend: 'Ext.form.Panel',
    border:false,
    alias: 'widget.leveldetails',
    initComponent: function() {
        console.log("initializing  XSG-LevelDetails");
		var me = this;

        Ext.applyIf(me, {
            defaults:{
				anchor:'100%'
			},
			title:'<b>Level Details</b>',
			monitorValid:true,
			bodyPadding:10,
            items: [{
				xtype:'numberfield',
				fieldLabel:'Speed in m/s',
				allowBlank:false,
				id: 'speedValue',
				value:6
			},{
				xtype:'numberfield',
				fieldLabel:'Length in Seconds',
				allowBlank:false,
				id:'secondsValue',
				value:60
			},{
				xtype:'numberfield',
				fieldLabel:'Chili Random Time',
				id:'levelChiliRandomTime',
				allowBlank:false,
				value:0
			},{
				xtype:'combo',
				editable:false,
				fieldLabel:'Music',
				store: "MusicStore",
				id:'levelMusic',
				queryMode: 'local',
				displayField: 'name',
				valueField: 'name'
			},{
				xtype:'checkbox',
				fieldLabel:'Open Leftside',
				id:'levelOpenLeftside',
				inputValue:'true',
				checked:true
			},{
				xtype:'button',
				formBind:true,
				style:'margin-top:15px;',
				height:30,
				id:'makeCanvasButton',
				text:'CREATE CANVAS'
			},{
				xtype:'button',
				style:'margin-top:10px;',
				height:30,
				id:'delCanvasButton',
				text:'DELETE CANVAS'
			}]
        });

        me.callParent(arguments);
    }

});