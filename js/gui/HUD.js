/**
 * HUDs (Head-Up Displays) show information to the
 * user above the actual game screen.
 *
 * For example, health, score, items and such...
 *
 * Each HUD shows a single information.
 * So we have a global container of HUDs, on which
 * we individually add each one to build the final
 * appearance.
 */

/*global game,me*/

// Here we make sure to create only if it wasn't
// already created before
game.HUD = game.HUD || {};

/**
 * Container for all the HUDs on the game.
 */
game.HUD.Container = me.ObjectContainer.extend({

	init : function() {
		this.parent();

		// Persistent across level changes
		this.isPersistent = true;

		// Non collidable
		this.collidable = false;

		// Makes sure to always draw on top of everything
		this.z = Infinity;

		// Give a cute name
		// NOTE: What for?
		this.name = "HUD";

		// Add your HUDs here
	}
});

game.HUD.Shinys = me.Renderable.extend({
    init: function(x,y) {
        this._super(me.Renderable, 'init', [x,y,10,10]);
        
        this.shinys = -1;
    },
    
    update: function(dt) {
        if(this.shinys !== game.data.shinys) {
            return true;
        }
        return false;
    },
    
    draw: function(context) {

        game.font_white.draw(
            context,
            'COLLECTED ' + game.data.shunys + '\nTRINKETS',
            this.pos.x,
            this.pos.y
        );
    }
});