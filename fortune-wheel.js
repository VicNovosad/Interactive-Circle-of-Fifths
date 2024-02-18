function initializeFortuneWheel() {
  const fortuneWheelConfig = {
    canvasId: 'fortune-wheel',
    outerRadius: 250, // Outermost circle for seconds
    innerRadius: 125,  // Innermost circle for hours
    sectorsQuantity: 10, // Maximum number of sectors, representing seconds and minutes
    circleRotation: 0, // No rotation needed initially
    titlesRotation: 0, // No rotation for titles
    keys: '', // Generate labels for each 5 minutes/seconds
    fillColors: false, // Different colors for hours, minutes, seconds
    showBoundaryCircles: false,
    rotateWordsWithSectors: true, // Labels do not rotate
		textYShift: 0,
		textXShift: 0,
    textSize: '18px',
    textWeight: '700',
    lineColor: 'transparent', // Black lines
		lineWidth: 1,
		showLeftSectorsLine: false,
		showRightSectorsLine: false,
		showBottomSectorsArc: false,
		showTopSectorsArc: false,
    sectorImages: ['/assets/cards/ActionMovieTower_card.png','/assets/cards/DarkQueenTower_card.png','/assets/cards/EdenianTowerPack_card.png','/assets/cards/ElderWindTower_card.png','/assets/cards/WhiteLotusTower_card.png','/assets/cards/KlassicTower_card.png','/assets/cards/ShiraiRyuTower_card.png','/assets/cards/SorcerersTowerPack_card.png','/assets/cards/TwistedTowerPack_card.png','/assets/cards/WhiteLotusTower_2_card.png'],
    rotateImagesWithSectors: true,
  };

  const fortuneWheel = new MultiCircleChart('fortune-wheel');
  fortuneWheel.addConfig(fortuneWheelConfig);
  fortuneWheel.startDrawing();

  // fortuneWheel.rotateChart(0, 10 );
  fortuneWheel.rotateChart(0, 90 );
  

  // Update the clock every second
  // setInterval(() => updateClock(fortuneWheel), 1000);

  let fortuneWheelCurrentRotation = 360; 
  let fortuneWheelMinSpeed = 10;
  let fortuneWheelMaxSpeed = 30;

  let fortuneWheelAnimationTarget = { rotation: 0 };
  gsap.to(fortuneWheelAnimationTarget, {
    rotation: fortuneWheelCurrentRotation, // Target rotation value
    // duration: 1,
    duration: getRandomSpeed(fortuneWheelMinSpeed, fortuneWheelMaxSpeed),
    repeat: -1, 
    yoyo: true,
    ease: "linear", // Use a linear ease for consistent rotation speed
    onUpdate: function() {
      fortuneWheel.rotateChart(0, fortuneWheelAnimationTarget.rotation );
    }
  });
}

initializeFortuneWheel();

// function getRandomSpeed(minSpeed, maxSpeed) {
//   return Math.random() * (maxSpeed - minSpeed) + minSpeed;
// }
