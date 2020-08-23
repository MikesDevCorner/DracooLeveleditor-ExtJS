console.log("including file: LevelController");

var creating=true;
var editing=false;
var erasing=false;


Ext.define('XSG.controller.LevelController', {
	requires: [
		"Ext.fx.Anim",
		"Ext.draw.Component",
		"Ext.window.MessageBox"
	],
    extend: 'Ext.app.Controller',
    init: function() {
        this.control({
            'leveldetails button[id=makeCanvasButton]': {
                click: function(btn) {
					if(this.getLevelpackCombo().getValue() == "" || this.getLevelpackCombo().getValue() == undefined) {
						Ext.Msg.alert("Notice","Please select a levelpack first...");
					} else {
						this.getCanvasHome().update("");
						this.getCanvasHome().removeAll();
						this.getCanvasHome().add(Ext.create("Ext.draw.Component",{
							width:this.getLevelSpeed().getValue() * this.getLevelSeconds().getValue() * (1280/20),
							height:800,
							myId:'draw',
							style: {
								background: 'url(images/'+this.getLevelpackCombo().getValue()+'/bg.jpg)',
								'background-repeat':'repeat',
								border: "1px dashed #99BCE8 !important;"
							}
						}));
						this.getLevelDetails().collapse();
						btn.setDisabled(true);
						this.getLevelSpeed().setDisabled(true);
						this.getLevelSeconds().setDisabled(true);
					}
				}
            },
			'leveldetails button[id=delCanvasButton]': {
				click: function(btn) {
					this.getItemPicture().down("image").setSrc("");
					this.getCanvasHome().update('<div style="padding:15px;">no level canvas created yet...</div>');
					this.getCanvasHome().removeAll();
					this.getCanvasButton().setDisabled(false);
					this.getLevelSpeed().setDisabled(false);
					this.getLevelSeconds().setDisabled(false);
				}
			},
			'draw': {
				click: function(e, eopts) {
					if(creating == true) {
						var draw = this.getDrawComponent();
						var itemGrid = this.getItemGrid();
						
						if(itemGrid.getSelectionModel().hasSelection()) {
							var selectedRecord = itemGrid.getSelectionModel().getSelection()[0];
							var pos_x = e.getPageX() - draw.getEl().getX();
							var pos_y = e.getPageY() - draw.getEl().getY();
							var sprite = Ext.create('Ext.draw.Sprite',{
								type: 'image',
								draggable:true,
								myRec: selectedRecord,
								src:"images/" + this.getLevelpackCombo().getValue() + "/" + selectedRecord.get("imagePath"),
								listeners: {
									click: {
										fn: this.handleSpriteclick,
										scope:this
									}
								},
								width:selectedRecord.get("width"),
								height:selectedRecord.get("height"),
								x: pos_x,
								y: pos_y
							});
							draw.surface.add(sprite).show(true);
						} else {
							Ext.Msg.alert("Notice","Please select an item from the itemlist on the left.");
						}
					}
				}
			}
        });
    },
	refs: [{
		ref: 'CanvasButton',
		selector: 'leveldetails button[id=makeCanvasButton]'
	},{
		ref: 'CanvasDelButton',
		selector: 'leveldetails button[id=delCanvasButton]'
	},{
		ref: 'CanvasHome',
		selector: 'maincontainer panel[id=canvasHome]'
	},{
		ref: 'LevelpackCombo',
		selector: 'maintoolbar > combo'
	},{
		ref: 'LevelItems',
		selector:'maincontainer panel levelitems'
	},{
		ref: 'LevelDetails',
		selector:'maincontainer panel leveldetails'
	},{
		ref: 'ItemGrid',
		selector:'maincontainer panel levelitems itemgrid'
	},{
		ref: 'LevelSpeed',
		selector: 'maincontainer panel leveldetails numberfield[id=speedValue]'
	},{
		ref: 'LevelSeconds',
		selector: 'maincontainer panel leveldetails numberfield[id=secondsValue]'
	},{
		ref: 'DrawComponent',
		selector: 'maincontainer panel[id=canvasHome] draw[myId=draw]'
	},{
		ref: 'ItemPicture',
		selector: 'maincontainer itempicture'
	}],
	handleSpriteclick: function(t,e,eopts) {
		if(erasing == true) {
			this.getDrawComponent().surface.remove(t,true);
		}
		if(editing == true) {
			if(t.myRec.get("type") == "Break") {
				var formElements = [{
					xtype:'textarea',
					fieldLabel:'Break-Text',
					allowBlank:false,
					value:t.breakText!=undefined?t.breakText:"Paused - tap to continue..."
				}];
				
				var win = Ext.create("Ext.window.Window", {
					title:'Edit ' +t.myRec.get("type")+' Element',
					width: 400,
					height: 160,
					layout: 'fit',
					modal:true,
					bodyPadding: 10,
					resizable:false,
					items:[{
						xtype:'form',
						monitorValid:true,
						border:false,
						defaults: {
							anchor:'100%'
						},
						bodyStyle:'background:transparent;',
						items:formElements,
						buttons: [{
							text:'Save',
							scope: this,
							formBind:true,
							handler: function() {
								t.breakText = win.down("textfield[fieldLabel=Break-Text]").getValue();
								win.close();
							}
						}]
					}]
				}).show();	
			}
		
		
			if(t.myRec.get("type") == "Enemy") {
			
				var formElements = [{
					xtype:'numberfield',
					fieldLabel:'ySpeed',
					minValue: -15,
					maxValue: 15,
					value:t.ySpeed!=undefined?t.ySpeed:0
				},{
					xtype:'numberfield',
					fieldLabel:'xSpeed',
					minValue: -15,
					maxValue: 15,
					value: t.xSpeed!=undefined?t.xSpeed:this.getLevelSpeed().getValue() + 2
				},{
					xtype:'numberfield',
					fieldLabel:'Motion Duration',
					minValue: 0.3,
					maxValue: 10,
					value:t.motionDuration!=undefined?t.motionDuration:1.5
				},{
					xtype:'numberfield',
					fieldLabel:'Motion Peculiarity',
					minValue: -10,
					maxValue: 10,
					value:t.motionPeculiarity!=undefined?t.motionPeculiarity:1
				},{
					xtype:'combo',
					fieldLabel:'Motion Equation',
					store: "MotionEquationStore",
					queryMode: 'local',
					editable:false,
					displayField: 'name',
					valueField: 'name',
					value: t.motionEquation!=undefined?t.motionEquation:'linear.inout'
				},{
					xtype:'checkbox',
					fieldLabel:'Motion Infinite',
					checked:t.motionInfinite!=undefined?t.motionInfinite:true
				}];
				
				var win = Ext.create("Ext.window.Window", {
					title:'Edit ' +t.myRec.get("type")+' Element',
					width: 350,
					height: 250,
					layout: 'fit',
					modal:true,
					bodyPadding: 10,
					resizable:false,
					items:[{
						xtype:'form',
						monitorValid:true,
						border:false,
						defaults: {
							anchor:'100%'
						},
						bodyStyle:'background:transparent;',
						items:formElements,
						buttons: [{
							text:'Save',
							scope: this,
							formBind:true,
							handler: function() {
								t.ySpeed = win.down("numberfield[fieldLabel=ySpeed]").getValue();
								t.xSpeed = win.down("numberfield[fieldLabel=xSpeed]").getValue();
								t.motionDuration = win.down("numberfield[fieldLabel=Motion Duration]").getValue();
								t.motionPeculiarity = win.down("numberfield[fieldLabel=Motion Peculiarity]").getValue();
								t.motionEquation = win.down("combo[fieldLabel=Motion Equation]").getValue();
								t.motionInfinite = win.down("checkbox[fieldLabel=Motion Infinite]").getValue();
								win.close();
							}
						}]
					}]
				}).show();													
			}
		}
	}
});