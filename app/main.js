require('style');
var Logo = require('logo'),
  renderer = new PIXI.WebGLRenderer(1000, 500, { // Or PIXI.autoDetectRenderer.
    antialias: true
  }),
  stage = new PIXI.Container();

PIXI.loader
  .add(Logo.logoImgSrc)
  .load(setup);

function setup() {
  var logoContainer;

  renderer.backgroundColor = 0xFFFFFF;
  document.body.appendChild(renderer.view);

  logoContainer = Logo.initContainer();
  logoContainer = Logo.createLogo(10, 10);
  logoContainer = Logo.createDot(990, 490);

  // Info
  Logo.info();

  stage.addChild(logoContainer);

  renderer.render(stage);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  Logo.logoAnimationStep();
  Logo.dotAnimationStep();

  renderer.render(stage);
}
