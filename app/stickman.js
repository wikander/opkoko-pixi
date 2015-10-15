var Stickman = (function() {
  var stickmanTextureAtlas = require('./img/stickman-texture-atlas.json'),
    stickmanImg = require('./img/stickman-texture-atlas.png'),
    stickmanAnimation,
    stickmanRightTextures = [],
    stickmanLeftTextures = [],
    stickmanStillTexture = [],
    speed = 0,
    animationSpeed = 0.25,
    Mousetrap = require('mousetrap');

  function info() {
    console.info('Stickman animation with speed and textures', speed, stickmanRightTextures);
  }

  function initAnimation(xPos, yPos) {
    speed = 0;
    animationSpeed = 0.30;
    var loadedStickmanTextures = PIXI.loader.resources[stickmanTextureAtlas].textures;

    for (var i = 3; i <= 13; i++) {
      stickmanRightTextures.push(
        loadedStickmanTextures[i + '_right.png']
      );
    }

    for (i = 3; i <= 13; i++) {
      stickmanLeftTextures.push(
        loadedStickmanTextures[i + '_left.png']
      );
    }

    stickmanStillTexture.push(loadedStickmanTextures['1_right.png']);

    stickmanAnimation = new PIXI.extras.MovieClip(stickmanStillTexture);

    stickmanAnimation.position.x = xPos;
    stickmanAnimation.position.y = yPos;

    stickmanAnimation.anchor.y = 1;
    stickmanAnimation.anchor.x = 0.5;

    stickmanAnimation.animationSpeed = animationSpeed;

    stickmanAnimation.interactive = true;

    // Keyboard and mouse events
    Mousetrap.bind('right', Stickman.goRight);
    Mousetrap.bind('left', Stickman.goLeft);
    Mousetrap.bind('up', Stickman.stop);
    Mousetrap.bind('s', Stickman.increaseSpeed);
    Mousetrap.bind('alt+s', Stickman.decreaseSpeed);
    stickmanAnimation.on('click', onAnimationClick);
    stickmanAnimation.on('tap', onAnimationClick);

    return stickmanAnimation;
  }

  function onAnimationClick() {
    if (speed === 0) {
      goRight();
    } else if (speed > 0) {
      goLeft();
    } else if (speed < 0) {
      goRight();
    }
  }

  function startGoRightAnimation() {
    stickmanAnimation.textures = stickmanRightTextures;
    startAnimation();
  }

  function startGoLeftAnimation() {
    stickmanAnimation.textures = stickmanLeftTextures;
    startAnimation();
  }

  function stopAnimation() {
    stickmanAnimation.textures = stickmanStillTexture;
    stickmanAnimation.stop();
  }

  function startAnimation() {
    console.info('Start moving with speed', speed);
    stickmanAnimation.play();
  }

  function goRight() {
    if (speed <= 0) {
      speed = -speed || 1;
      startGoRightAnimation();
    }
  }

  function goLeft() {
    if (speed >= 0) {
      speed = -speed || -1;
      startGoLeftAnimation();
    }
  }

  function stop() {
    speed = 0;
    setBlur();
    stopAnimation();
  }

  function move() {
    stickmanAnimation.position.x += speed;

    if (stickmanAnimation.position.x < -20 && speed < 0) {
      stickmanAnimation.position.x = 1020;
    } else if (stickmanAnimation.position.x > 1020 && speed > 0) {
      stickmanAnimation.position.x = -20;
    }
  }

  function increaseSpeed() {
    if (speed != 0) {
      var absSpeed = Math.abs(speed);
      speed = speed + (speed / absSpeed);

      setBlur();
      console.info('Speed is now', speed);
    }
  }

  function setBlur() {
    var blur = new PIXI.filters.BlurFilter();
    blur.blurX = speed;
    blur.blurY = speed;

    stickmanAnimation.filters = [ blur ];
  }

  function decreaseSpeed() {
    var absSpeed = Math.abs(speed);
    if (absSpeed > 1) {
      speed = speed - (speed / absSpeed);
      console.info('Speed is now', speed);
      setBlur();
    }
  }

  return {
    // Functions
    initAnimation: initAnimation,
    startAnimation: startAnimation,
    goRight: goRight,
    goLeft: goLeft,
    stop: stop,
    move: move,
    increaseSpeed: increaseSpeed,
    decreaseSpeed: decreaseSpeed,
    info: info,

    // Variables
    stickmanTextureAtlas: stickmanTextureAtlas
  };
})();

module.exports = Stickman;
