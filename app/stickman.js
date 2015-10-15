var Stickman = (function() {
  var stickmanTextureAtlas = require('./img/stickman-texture-atlas.json'),
    stickmanImg = require('./img/stickman-texture-atlas.png'),
    stickmanAnimation,
    stickmanStillTexture = [];

  function info() {
    console.info('Stickman animation with speed and textures', stickmanAnimation.textures);
  }

  function initAnimation(xPos, yPos) {
    var loadedStickmanTextures = PIXI.loader.resources[stickmanTextureAtlas].textures;

    stickmanStillTexture.push(loadedStickmanTextures['1_right.png']);

    stickmanAnimation = new PIXI.extras.MovieClip(stickmanStillTexture);

    stickmanAnimation.position.x = xPos;
    stickmanAnimation.position.y = yPos;

    stickmanAnimation.anchor.y = 1;
    stickmanAnimation.anchor.x = 0.5;

    stickmanAnimation.animationSpeed = 0.30;

    return stickmanAnimation;
  }

  return {
    // Functions
    initAnimation: initAnimation,
    info: info,

    // Variables
    stickmanTextureAtlasSrc: stickmanTextureAtlas
  };
})();

module.exports = Stickman;
