var Logo = (function() {
  var logoImg = require('./img/op-logo-black-no-dot.png'),
    logo,
    logoContainer = new PIXI.Container(),
    logoCenter = new PIXI.Point(100, 38.5);

  function info() {
  }

  function initContainer() {
    logoContainer.pivot.x = logoCenter.x;
    logoContainer.pivot.y = logoCenter.y;

    logoContainer.x = logoCenter.x;
    logoContainer.y = logoCenter.y;

    return logoContainer;
  }

  function createLogo(positionX, positionY) {
    logo = new PIXI.Sprite(
      PIXI.loader.resources[logoImg].texture
    );
    logo.position.x = positionX;
    logo.position.y = positionY;

    logoContainer.addChild(logo);
    return logoContainer;
  }

  return {
    // Functions
    createLogo: createLogo,
    info: info,
    initContainer: initContainer,

    // Variables
    logoImgSrc: logoImg
  };
})();

module.exports = Logo;
