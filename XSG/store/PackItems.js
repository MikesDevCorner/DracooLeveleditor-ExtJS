Ext.define('XSG.store.PackItems', {
    extend: 'Ext.data.Store',
    fields: [
		{name: 'name',  type: 'string'},
		{name: 'imagePath',  type: 'string'},
		{name: 'origin',  type: 'auto'},
		{name: 'type', type:'string'},
		{name: 'width', type:'int'},
		{name: 'height', type:'int'}
	],
	listeners: {
		load: {
			fn: function(store,recs,succ,opts) {
				var delArray = [];
				store.each(function(storeItem, index, count) {
					Ext.each(items, function(item) {
						if(storeItem.get("name") == item.name) {
							storeItem.set("type", item.type);
							storeItem.set("width", item.width);
							storeItem.set("height", item.height);
						}
						if(storeItem.get("name") == "bone" || storeItem.get("name") == "skull" || storeItem.get("name") == "resin_drop" || storeItem.get("name") == "Bossbat" || storeItem.get("name") == "bosssnake_cover" || storeItem.get("name") == "bosssnake_hurtable" || storeItem.get("name") == "bossnake_venom" || storeItem.get("name") == "sign_wh" || storeItem.get("name") == "sign_woh") {
							delArray.push(storeItem);
						}
					});
				});
				Ext.each(delArray, function(deletable) {
					store.remove(deletable);
				});
				store.add({name:'Chili', type:'Powerup', imagePath:'chili.png', origin:{x:0.45499998331069946,y:0.6050000190734863}, width: 122, height: 142});
				
				store.add({name:'sign_right_way_wh', type:'Obstacle', imagePath:'sign1wh.png', origin:{x:0.5024999380111694,y:0.0925000011920929}, width: 163, height: 94});
				store.add({name:'sign_arrow_wh', type:'Obstacle', imagePath:'sign2wh.png', origin:{x:0.5024999380111694,y:0.0925000011920929}, width: 163, height: 94});
				store.add({name:'sign_oops_wh', type:'Obstacle', imagePath:'sign3wh.png', origin:{x:0.5024999380111694,y:0.0925000011920929}, width: 163, height: 94});
				store.add({name:'sign_dead_end_wh', type:'Obstacle', imagePath:'sign4wh.png', origin:{x:0.5024999380111694,y:0.0925000011920929}, width: 163, height: 94});
				
				store.add({name:'sign_right_way_woh', type:'Obstacle', imagePath:'sign1woh.png', origin:{x:0.512499988079071,y:0.039999932050704956}, width: 163, height: 89});
				store.add({name:'sign_arrow_woh', type:'Obstacle', imagePath:'sign2woh.png', origin:{x:0.512499988079071,y:0.039999932050704956}, width: 163, height: 89});
				store.add({name:'sign_oops_woh', type:'Obstacle', imagePath:'sign3woh.png', origin:{x:0.512499988079071,y:0.039999932050704956}, width: 163, height: 89});
				store.add({name:'sign_dead_end_woh', type:'Obstacle', imagePath:'sign4woh.png', origin:{x:0.512499988079071,y:0.039999932050704956}, width: 163, height: 89});
				
				store.add({name:'Break', type:'Break', imagePath:'break.png', origin:{x:0,y:0}, width: 20, height: 400});
				store.commitChanges();
				store.sort('type', 'ASC');
			}
		}
	}
});