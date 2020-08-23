console.log("including file: GenericController");

Ext.define('XSG.controller.GenericController', {
    extend: 'Ext.app.Controller',
	requires: [
		'Ext.window.MessageBox',
		'Ext.Ajax',
		'Ext.data.Connection',
		'XSG.view.MainContainer',
		'XSG.view.Viewport'
	],
	stores: [
		'Levelpack',
		'PackItems',
		'MotionEquationStore',
		'MusicStore'
	],
	init: function() {
        this.control({
            'maintoolbar > combo': {
                select: function(combo, records, eOpts) {
					var levelPack = records[0].get('levelpack');
					var proxy = Ext.create('XSG.model.'+levelPack+"Proxy");
					var store = this.getStore("PackItems");
					store.setProxy(proxy);
					store.load();
					
					if(levelPack == "Batmine") this.getStore("MusicStore").loadData(Batmine);
					if(levelPack == "Jungle") this.getStore("MusicStore").loadData(Jungle);
					if(this.getStore("MusicStore").getCount() > 0) {
						this.getMusicCombo().setValue(this.getStore("MusicStore").first().get("name"));
					}
					
					this.getLevelItems().collapse();
					
					this.getDelCanvasButton().fireEvent("click",this.getDelCanvasButton());
				}
            },
			'maintoolbar > button[iconCls=export]': {
				click: function() {
					var jsonCode = this.CreateJsonCode();
					if(jsonCode != null) {
						var win = Ext.create("Ext.window.Window",{
							title:"The Level's JSON-Code",
							layout:'fit',
							width: 950,
							height: 600,
							bodyPadding:10,
							modal: true,
							items: [{
								xtype:'textarea',
								value: jsonCode
							}]
						}).show();
					}
				}
			},
			'maintoolbar > button[iconCls=play]': {
				click: function() {
					window.open('http://dracoo-07b.xsheetgames.com');
				}
			},
			'maintoolbar > button[iconCls=download]': {
				click: function() {
					if(this.getLevelpackCombo().getValue() != "" && this.getLevelpackCombo().getValue() != undefined) {
						var filename;
						var myNumber = ("0" + this.getLevelNumber().getValue()).slice(-2);					
						if(this.getLevelpackCombo().getValue() != "Batmine") filename = this.getLevelpackCombo().getValue() + "_" + myNumber + ".json";
						else filename = "BatMine_" + myNumber + ".json";					
						
						Ext.Ajax.request({
							url: 'controllers/filehandling.php',
							scope:this,
							params: {
								mode:'load',
								levelpack:this.getLevelpackCombo().getValue(),
								filename:filename
							},
							success: function(response){
								this.OpenJsonLevel(response.responseText);
							}
						});
					} else Ext.Msg.alert("Notice","Please select a Levelpack first.");
				}
			},
			'maintoolbar > button[iconCls=upload]': {
				click: function() {
					var filename;
					var myNumber = ("0" + this.getLevelNumber().getValue()).slice(-2);					
					if(this.getLevelpackCombo().getValue() != "Batmine") filename = this.getLevelpackCombo().getValue() + "_" + myNumber + ".json";
					else filename = "BatMine_" + myNumber + ".json";					
					
					var myJson = this.CreateJsonCode().replace(/"/g, '@');
					
					Ext.Ajax.request({
						url: 'controllers/filehandling.php',
						scope:this,
						params: {
							mode:'upload',
							json: myJson,
							levelpack:this.getLevelpackCombo().getValue(),
							filename:filename
						},
						success: function(response){
							var resp = Ext.decode(response.responseText);
							if(resp.success == true) Ext.Msg.alert("Success","Level pushed to server successfully. You can try it now with the try button in the upper right corner.<br>Please clear your browsers cache before you do so!!");
							else Ext.Msg.alert("Failure","Something went wrong!!");
						}
					});
				}
			},
			'maintoolbar > button[iconCls=import]': {
				click: function() {
					if(this.getLevelpackCombo().getValue() != "" && this.getLevelpackCombo().getValue() != undefined) {
						var win = Ext.create("Ext.window.Window",{
							title:"Import JSON-Code",
							layout:'fit',
							width: 950,
							height: 600,
							bodyPadding:10,
							scope:this,
							modal: true,
							items: [{
								xtype:'textarea'
							}],
							buttons:[{
								text:'Process and create Level', 
								scope: this, 
								handler: function() {
									this.OpenJsonLevel(win.down("textarea").getValue());
									win.close();
								}
							}]
						}).show();
					} else Ext.Msg.alert("Notice","Please select a Levelpack first. Otherwise I don't know which elements are to import. ");
				}
			}
        });
    },
	refs: [{
		ref: 'LevelSpeed',
		selector: 'maincontainer panel leveldetails numberfield[id=speedValue]'
	},{
		ref: 'LevelSeconds',
		selector: 'maincontainer panel leveldetails numberfield[id=secondsValue]'
	},{
		ref: 'LevelOpenBack',
		selector: 'maincontainer panel leveldetails checkbox[id=levelOpenLeftside]'
	},{
		ref: 'LevelChiliRandomTime',
		selector: 'maincontainer panel leveldetails numberfield[id=levelChiliRandomTime]'
	},{
		ref: 'LevelMusic',
		selector: 'maincontainer panel leveldetails combo[id=levelMusic]'
	},{
		ref: 'ItemPicture',
		selector: 'maincontainer itempicture'
	},{
		ref: 'LevelDetails',
		selector:'maincontainer panel leveldetails'
	},{
		ref: 'LevelItems',
		selector:'maincontainer panel levelitems'
	},{
		ref: 'CanvasHome',
		selector: 'maincontainer panel[id=canvasHome]'
	},{
		ref: 'LevelpackCombo',
		selector: 'maintoolbar > combo'
	},{
		ref: 'LevelNumber',
		selector: 'maintoolbar > numberfield[id=levelnumber]'
	},{
		ref: 'MusicCombo',
		selector: 'maincontainer panel leveldetails combo[fieldLabel=Music]'
	},{
		ref:'CanvasButton',
		selector:'leveldetails button[id=makeCanvasButton]'
	},{
		ref:'DelCanvasButton',
		selector:'leveldetails button[id=delCanvasButton]'
	},{
		ref: 'DrawComponent',
		selector: 'maincontainer panel[id=canvasHome] draw[myId=draw]'
	}],
	OpenJsonLevel: function(json) {
		var inputText = json;
		var Level;
		var goOn = true;
		try {
			Level = Ext.decode(inputText);
		} catch(e) {
			Ext.Msg.alert("Error","Error while parsing the given json code.");
			goOn = false;
		}
		if(goOn) {
			this.getLevelSpeed().setValue(Level.speed);
			this.getLevelSeconds().setValue(Level.seconds);
			this.getLevelOpenBack().setValue(Level.openBack);
			this.getLevelChiliRandomTime().setValue(Level.chiliRandomTime);
			this.getLevelMusic().setValue(Level.music);
			this.getCanvasButton().fireEvent("click",this.getCanvasButton());
			Ext.each(Level.enemies, function(enemy) {
				var rec = this.getStore("PackItems").findRecord("name",enemy.name);
				
				var posX = (this.getLevelSpeed().getValue() * enemy.ctime * 1280 / 20) - rec.get("width") * rec.get("origin").x;
				var posY = (800 - (enemy.y * 1280 / 20)) - (rec.get("height") - rec.get("width") * rec.get("origin").y);
				
				var sprite = Ext.create('Ext.draw.Sprite',{
					type: 'image',
					draggable:true,
					myRec: rec,
					src:"images/" + this.getLevelpackCombo().getValue() + "/" + rec.get("imagePath"),
					listeners: {
						click: {
							fn: this.getController("XSG.controller.LevelController").handleSpriteclick,
							scope:this.getController("XSG.controller.LevelController")
						}
					},
					width:rec.get("width"),
					height:rec.get("height"),
					x: posX,
					y: posY,
					ySpeed: enemy.ySpeed,
					xSpeed: enemy.xSpeed,
					motionDuration: enemy.motionDuration,
					motionPeculiarity: enemy.motionPeculiarity,
					motionEquation: enemy.motionEquation,
					motionInfinite: enemy.motionInfinite
				});
				this.getDrawComponent().surface.add(sprite).show(true);
			},this);
			Ext.each(Level.obstacles, function(obstacle) {
				var rec = this.getStore("PackItems").findRecord("name",obstacle.name);
				
				var posX = (this.getLevelSpeed().getValue() * obstacle.ctime * 1280 / 20) - rec.get("width") * rec.get("origin").x;
				var posY = (800 - (obstacle.y * 1280 / 20)) - (rec.get("height") - rec.get("width") * rec.get("origin").y);
				
				var sprite = Ext.create('Ext.draw.Sprite',{
					type: 'image',
					draggable:true,
					myRec: rec,
					src:"images/" + this.getLevelpackCombo().getValue() + "/" + rec.get("imagePath"),
					listeners: {
						click: {
							fn: this.getController("XSG.controller.LevelController").handleSpriteclick,
							scope:this.getController("XSG.controller.LevelController")
						}
					},
					width:rec.get("width"),
					height:rec.get("height"),
					x: posX,
					y: posY
				});
				this.getDrawComponent().surface.add(sprite).show(true);
			},this);
			Ext.each(Level.powerups, function(powerup) {
				var rec = this.getStore("PackItems").findRecord("name","Chili");
				
				var posX = (this.getLevelSpeed().getValue() * powerup.ctime * 1280 / 20) - rec.get("width") * rec.get("origin").x;
				var posY = (800 - (powerup.y * 1280 / 20)) - (rec.get("height") - rec.get("width") * rec.get("origin").y);
				
				var sprite = Ext.create('Ext.draw.Sprite',{
					type: 'image',
					draggable:true,
					myRec: rec,
					src:"images/" + this.getLevelpackCombo().getValue() + "/" + rec.get("imagePath"),
					listeners: {
						click: {
							fn: this.getController("XSG.controller.LevelController").handleSpriteclick,
							scope:this.getController("XSG.controller.LevelController")
						}
					},
					width:rec.get("width"),
					height:rec.get("height"),
					x: posX,
					y: posY
				});
				this.getDrawComponent().surface.add(sprite).show(true);
			},this);
			
			Ext.each(Level.breaks, function(myBreak) {
				var rec = this.getStore("PackItems").findRecord("name","Break");
				
				var posX = (this.getLevelSpeed().getValue() * myBreak.ctime * 1280 / 20) - rec.get("width") * rec.get("origin").x;
				var posY = 100;
				
				var sprite = Ext.create('Ext.draw.Sprite',{
					type: 'image',
					draggable:true,
					breakText: myBreak.message,
					myRec: rec,
					src:"images/" + this.getLevelpackCombo().getValue() + "/" + rec.get("imagePath"),
					listeners: {
						click: {
							fn: this.getController("XSG.controller.LevelController").handleSpriteclick,
							scope:this.getController("XSG.controller.LevelController")
						}
					},
					width:rec.get("width"),
					height:rec.get("height"),
					x: posX,
					y: posY
				});
				this.getDrawComponent().surface.add(sprite).show(true);
			},this);
		}
	},
	CreateJsonCode: function() {
		if(this.getLevelpackCombo().getValue() == "" || this.getLevelpackCombo().getValue() == undefined) Ext.Msg.alert("Notice","Please select a levelpack first...");
		else {
			if(this.getCanvasHome().down("draw") == null) Ext.Msg.alert("Notice","Please create a canvas first...");
			else {
			
				var mySurface = this.getCanvasHome().down("draw").surface;
				var enemyString = "";
				var enemyCounter = 0;
				var obstacleString = "";
				var obstacleCounter = 0;
				var powerupString = "";
				var powerupCounter = 0;
				var breakString = "";
				var breakCounter = 0;
				
				Ext.each(mySurface.items.items, function(sprite) {
					if(sprite.myRec != undefined) {
					
						var tmpX = (sprite.attr.translation.x != null?(sprite.attr.translation.x+sprite.attr.x):sprite.attr.x);
						var tmpY = (sprite.attr.translation.y != null?(sprite.attr.translation.y+sprite.attr.y):sprite.attr.y);
					
						var ctime = (tmpX + sprite.myRec.get("width") * sprite.myRec.get("origin").x) / 1280 * 20 / this.getLevelSpeed().getValue();
						var y = 12.5 - (tmpY + (sprite.myRec.get("height") - sprite.myRec.get("width") * sprite.myRec.get("origin").y)) / 1280 * 20;									
						
						if(sprite.myRec.get("type") == "Enemy") {
							if(enemyCounter != 0) enemyString += ",";
							enemyString += '{\n';
							enemyString += '          "ctime":'+ctime+',\n';
							enemyString += '          "name":"'+sprite.myRec.get('name')+'",\n';
							enemyString += '          "y":'+y+',\n';
							enemyString += '          "ySpeed": '+((sprite.ySpeed!=undefined)?sprite.ySpeed:0)+',\n';
							enemyString += '          "xSpeed": '+((sprite.xSpeed!=undefined)?sprite.xSpeed:(this.getLevelSpeed().getValue()+2))+',\n';
							enemyString += '          "motionDuration": '+((sprite.motionDuration!=undefined)?sprite.motionDuration:1.5)+',\n';
							enemyString += '          "motionPeculiarity": '+((sprite.motionPeculiarity!=undefined)?sprite.motionPeculiarity:1)+',\n';
							enemyString += '          "motionEquation": "'+((sprite.motionEquation!=undefined)?sprite.motionEquation:'linear.inout')+'",\n';
							enemyString += '          "motionInfinite": '+((sprite.motionInfinite!=undefined)?sprite.motionInfinite:true) +'\n';
							enemyString += '     }';
							enemyCounter++;
						}
						
						if(sprite.myRec.get("type") == "Obstacle") {
							if(obstacleCounter != 0) obstacleString += ",\n";
							obstacleString += '          {"ctime":'+ctime+', "y": '+y+', "name":"'+sprite.myRec.get('name')+'"}';
							obstacleCounter++;
						}
						
						if(sprite.myRec.get("type") == "Powerup") {
							if(powerupCounter != 0) powerupString += ",\n";
							powerupString += '          {"ctime":'+ctime+', "x":25, "y": '+y+'}';
							powerupCounter++;
						}
						
						if(sprite.myRec.get("type") == "Break") {
							if(breakCounter != 0) breakString += ",\n";
							breakString += '          {"ctime":'+ctime+', "message":"'+((sprite.breakText!=undefined)?sprite.breakText:"Paused - tap to continue...")+'"}';
							breakCounter++;
						}
					}
				},this);
			
				var jsonCode =  '{\n';
				jsonCode += '     "speed": ' + this.getLevelSpeed().getValue() + ',\n';
				jsonCode += '     "seconds": ' + this.getLevelSeconds().getValue() + ',\n';
				jsonCode += '     "openBack": "' + this.getLevelOpenBack().getValue() + '",\n';
				jsonCode += '     "chiliRandomTime": ' + this.getLevelChiliRandomTime().getValue() + ',\n';
				jsonCode += '     "music": "' + this.getLevelMusic().getValue() + '",\n';
				jsonCode += '     "enemies": [';
				jsonCode += enemyString;
				jsonCode += '],\n';
				jsonCode += '     "obstacles": [\n';
				jsonCode += obstacleString + "\n";
				jsonCode += '     ],\n';
				jsonCode += '     "powerups": [\n';
				jsonCode += powerupString + "\n";
				jsonCode += '     ],\n';
				jsonCode += '     "breaks": [\n';
				jsonCode += breakString + "\n";
				jsonCode += '     ]\n';
				jsonCode += '}';
				return jsonCode;
			}
		}
		return null;
	}
});