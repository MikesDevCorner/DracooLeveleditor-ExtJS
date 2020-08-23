console.log("including file: app");


var items = [

	//JUNGLE
	{name:'bambus', type:'Obstacle', width: 153, height:560},
	{name:'big_bat_flying', type:'Enemy', width: 150, height:110},
	{name:'column', type:'Obstacle', width: 129, height:435},
	{name:'evil_plant_enm', type:'Enemy', width: 174, height:121},
	{name:'evil_plant_obs', type:'Obstacle', width: 245, height:391},
	{name:'plant_flying', type:'Enemy', width: 142, height:120},
	{name:'plant_thorns_btm', type:'Obstacle', width: 277, height:444},
	{name:'plant_thorns_top', type:'Obstacle', width: 277, height:444},
	{name:'small_bat_flying', type:'Enemy', width: 104, height:84},
	{name:'spider_column_bottom', type:'Obstacle', width: 174, height:601},
	{name:'spider_column_top', type:'Obstacle', width: 175, height:596},
	{name:'spider_stone', type:'Obstacle', width: 175, height:175},
	{name:'spiky_plant_btm', type:'Obstacle', width: 263, height:457},
	{name:'spiky_plant_top', type:'Obstacle', width: 264, height:457},
	{name:'stone_big', type:'Obstacle', width: 252, height:253},
	{name:'stone_breakable', type:'Obstacle', width: 129, height:129},
	{name:'stone_sml', type:'Obstacle', width: 171, height:172},
	{name:'tree', type:'Obstacle', width: 124, height:596},
	{name:'treetrunk', type:'Obstacle', width: 408, height:400},
	{name:'vine_a', type:'Obstacle', width: 140, height:224},
	{name:'vine_b', type:'Obstacle', width: 87, height:381},
	
	//BATMINE
	{name:'Bat1', type:'Enemy', width: 150, height:110},
	{name:'Bat2', type:'Enemy', width: 104, height:84},
	{name:'boner_down', type:'Obstacle', width:311 , height:575},
	{name:'boner_up', type:'Obstacle', width:242 , height:567},
	{name:'flat', type:'Obstacle', width:151 , height:107},
	{name:'needle_down', type:'Obstacle', width:256 , height:590},
	{name:'needle_up', type:'Obstacle', width:260 , height:592},
	{name:'pyramid_down', type:'Obstacle', width:492 , height:504},
	{name:'pyramid_up', type:'Obstacle', width:490 , height:501},
	{name:'square', type:'Obstacle', width:105 , height:111},
	{name:'stalacmite_a', type:'Obstacle', width:246 , height:270},
	{name:'stalacmite_b', type:'Obstacle', width:314 , height:292},
	{name:'stalacmite_c', type:'Obstacle', width:304 , height:253},
	{name:'stalactite_a', type:'Obstacle', width:188 , height:208},
	{name:'stalactite_b', type:'Obstacle', width:224 , height:379},	
	{name:'block_full', type:'Obstacle', width:167 , height:186},
	{name:'block_half', type:'Obstacle', width:165 , height:132},
	{name:'column_b', type:'Obstacle', width:167 , height:693},
	{name:'long_bottom_first', type:'Obstacle', width:720 , height:446},
	{name:'long_bottom_second', type:'Obstacle', width:721 , height:446},
	{name:'long_top_first', type:'Obstacle', width:721 , height:446},
	{name:'long_top_second', type:'Obstacle', width:720 , height:446},
	{name:'longflat', type:'Obstacle', width:585 , height:64},
	{name:'tilted_l', type:'Obstacle', width:572 , height:194},
	{name:'tilted_r', type:'Obstacle', width:572 , height:194},
	{name:'volcano', type:'Obstacle', width:247 , height:279},
	{name:'stone_string', type:'Obstacle', width:149 , height:502},
	{name:'lava', type:'Obstacle', width:116 , height:486},
	{name:'lava_rev', type:'Obstacle', width:116 , height:486},
	{name:'volcano_rev', type:'Obstacle', width:247 , height:279},
	
	//GENERAL
	{name:'nextlevel', type:'Obstacle', width: 445, height:632}
];

var Batmine = [
	{name: 'batmine/music/dracoo.ogg'},
	{name: 'batmine/music/reach.ogg'}
];

var Jungle = [
	{name: 'jungle/music/wilbur.ogg'},
	{name: 'batmine/music/dracoo.ogg'}
];


Ext.define("XSG.app.Application", {
    extend: "Ext.app.Application",
    requires: [ 
        'Ext.app.Application',
        'Ext.Ajax',
        'XSG.controller.GenericController',
        'XSG.controller.LevelController',
		'XSG.controller.LevelItemsController'
    ],
    autoCreateViewport: true,
    name: 'XSG',
    appFolder: 'XSG',
    controllers: [
        'GenericController',
        'LevelController',
		'LevelItemsController'
    ],
    launch: function() {
        me = this;
		console.log("launching xsg-app");
    }
});


Ext.onReady(function() {
	console.log("Ext.onReady");
	APIs = {};
    APIs.app = Ext.create("XSG.app.Application");
	console.log("XSG-App created");
});