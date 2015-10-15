require('style');
var Logo = require('logo'),
  renderer = new PIXI.WebGLRenderer(1000, 500, { // Or PIXI.autoDetectRenderer.
    antialias: true
  }),
  stage = new PIXI.Container(),
  backgroundImg = require('./img/background.png'),
  wallImg = require('./img/wall.png'),
  Stickman = require('stickman');

PIXI.loader
  .add(Logo.logoImgSrc)
  .add(backgroundImg)
  .add(wallImg)
  .add(Stickman.stickmanTextureAtlasSrc)
  .load(setup);

function setup() {
  var logoContainer,
    background,
    wall,
    stickmanAnimation;

  renderer.backgroundColor = 0xFFFFFF;
  document.body.appendChild(renderer.view);

  logoContainer = Logo.initContainer();
  logoContainer = Logo.createLogo(10, 10);
  logoContainer = Logo.createDot(990, 490);

  background = new PIXI.Sprite(
    PIXI.loader.resources[backgroundImg].texture
  );

  wall = new PIXI.Sprite(
    PIXI.loader.resources[wallImg].texture
  );
  wall.position.x = 800;
  wall.alpha = 0.3;

  stickmanAnimation = Stickman.initAnimation(500, 500);

  // Info
  Logo.info();
  Stickman.info();

  stage.addChild(background);
  stage.addChild(stickmanAnimation);
  stage.addChild(wall);
  //stage.addChild(logoContainer);

  renderer.render(stage);
}
