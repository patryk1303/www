// And the SHINY TRINKET!

// make sure if namespace exists
game.shinys = game.shinys || {};

/**
* Contains all collected Shiny Trinkets
*/
game.shinys.collected = [];

game.shinys.entity = me.ObjectEntity.extend({
    init: function(x,y,settings) {
        
        // Aside from the `settings` passed by Tiled
        settings.image = 'shiny';

        // The collision box will be approximately 1 tile per two
        // But the actual sprites are the following:
        settings.spritewidth  = settings.width  = 2;
        settings.spriteheight = settings.height = 2;
        
        this.parent(x,y,settings);
          
        this.renderable.addAnimation('shiny', [0,1], 200);
        this.renderable.setCurrentAnimation('shiny');

        this.collected = false;
        this.gravity    = 0;
        this.collidable = true;
        this.type = me.game.SHINY_TRINKET;
    },
    
    update: function(dt) {
        if(this.collected) {
            return false;
        }
        return true;
    },
    
    /**
	 * Called when anything collide with us.
	 *
	 * Probably the player, so let's start collecting!
	 */
    onCollision : function(collision, other) {
        // Only collect if it's the Player
        if (other.type === me.game.PLAYER_OBJECT)
            this.collect();
    },
    
    collect: function() {
        if(this.collected) {
            return;
        }
        
        this.collected = true;
        game.data.shinys++;

        me.audio.play('death', false, null, me.save.sfxVolume);
        
        me.game.world.removeChild(this);
        game.shinys.collected.push(this);
    }
});