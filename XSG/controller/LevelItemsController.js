console.log("including file: LevelItemsController");

Ext.define('XSG.controller.LevelItemsController', {
	requires: [
		'XSG.model.JungleProxy',
		'XSG.model.BatmineProxy'
	],
    extend: 'Ext.app.Controller',
    init: function() {
        this.control({
            'itemgrid': {
                itemclick: function(grid, record, item, index, e, eOpts) {
					this.getItemPicture().down("image").setSrc("images/"+this.getLevelpackCombo().getValue() + "/" + record.get("imagePath"));
				}
            }
        });
    },
	refs: [{
		ref: 'LevelpackCombo',
		selector: 'maintoolbar > combo'
	},{
		ref: 'ItemPicture',
		selector: 'maincontainer itempicture'
	}],
});