var Logo = (function() {
  var logoImg = require('./img/op-logo-black-no-dot.png'),
    logo,
    logoContainer = new PIXI.Container(),
    logoCenter = new PIXI.Point(100, 38.5),
    dotRadius = 6.7,
    dot;

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

  function createDot(positionX, positionY) {
    dot = new PIXI.Graphics();
    dot.beginFill(0x000000);

    dot.position.x = positionX;
    dot.position.y = positionY;

    dot.drawCircle(0, 0, dotRadius);

    logoContainer.addChild(dot);
    return logoContainer;
  }

  return {
    // Functions
    createLogo: createLogo,
    info: info,
    initContainer: initContainer,
    createDot: createDot,

    // Variables
    logoImgSrc: logoImg
  };
})();

module.exports = Logo;
