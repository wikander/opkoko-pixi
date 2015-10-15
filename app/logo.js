var Logo = (function() {
  var logoImg = require('./img/op-logo-black-no-dot.png'),
    logo,
    logoContainer = new PIXI.Container(),
    logoCenter = new PIXI.Point(100, 38.5),
    dotRadius = 6.7,
    dot,
    Bezier = require('bezier-js/lib/index.js'),
    dotFinalPosition = new PIXI.Point(172, 70),
    dasProgress = 0,
    lasProgress = 0,
    dotAnimationPositions = [],
    dotAnimationStarted = false,
    logoAnimationStarted = false;

  function info() {
    console.table(dotAnimationPositions);
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

    dotAnimationPositions = new Bezier(positionX, positionY, 0, 500, dotFinalPosition.x, dotFinalPosition.y).getLUT(50);

    dot.drawCircle(0, 0, dotRadius);

    dot.interactive = true;

    dot.on('click', onDotClick);
    dot.on('tap', onDotClick);

    logoContainer.addChild(dot);
    return logoContainer;
  }

  function onDotClick() {
    if (!dotAnimationStarted) {
      dotAnimationStarted = true;
    } else if (!logoAnimationStarted) {
      logoAnimationStarted = true;
    }
  }

  function dotAnimationStep() {
    if (dotAnimationStarted && dasProgress < dotAnimationPositions.length - 1) {
      dasProgress++;
      dot.position.x = dotAnimationPositions[dasProgress].x;
      dot.position.y = dotAnimationPositions[dasProgress].y;
    }
  }

  function logoAnimationStep() {
    if (logoAnimationStarted) {
      var startPosition = new PIXI.Point(0, 0),
        finalPosition = new PIXI.Point(500 - logoCenter.x, 250 - logoCenter.y),
        numOfSteps = 100,
        numOfStepsPercentage = 1 / numOfSteps,
        deltaX = (finalPosition.x - startPosition.x) * numOfStepsPercentage,
        deltaY = (finalPosition.y - startPosition.y) * numOfStepsPercentage;

      if (lasProgress < numOfSteps) {

        // Move
        logoContainer.position.x += deltaX;
        logoContainer.position.y += deltaY;

        // Rotate
        logoContainer.rotation += (2 * Math.PI) * numOfStepsPercentage;

        // Scale
        logoContainer.scale.x -= numOfStepsPercentage;
        logoContainer.scale.y -= numOfStepsPercentage;

        console.info('Logo animation progress ', lasProgress);
        lasProgress++;
      }
    }
  }

  return {
    // Functions
    createLogo: createLogo,
    createDot: createDot,
    dotAnimationStep: dotAnimationStep,
    info: info,
    initContainer: initContainer,
    logoAnimationStep: logoAnimationStep,

    // Variables
    logoImgSrc: logoImg
  };
})();

module.exports = Logo;
