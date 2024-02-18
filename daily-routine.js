function initializeClock() {
  const clockConfig = {
    canvasId: 'daily-schedule',
    outerRadius: 270, // Outermost circle for seconds
    innerRadius: 10,  // Innermost circle for hours
    sectorsQuantity: 60, // Maximum number of sectors, representing seconds and minutes
    circleRotation: -58, // No rotation needed initially
    titlesRotation: -58, // No rotation for titles
    keys: generateClockKeys(), // Generate labels for each 5 minutes/seconds
    fillColors: generateClockFillColors(), // Different colors for hours, minutes, seconds
    showBoundaryCircles: false,
    rotateWordsWithSectors: true, // Labels do not rotate
		textYShift: -100,
		textXShift: -12,
    textSize: '18px',
    textWeight: '700',
    lineColor: 'transparent', // Black lines
		lineWidth: 0,
		showLeftSectorsLine: false,
		showRightSectorsLine: false,
		showBottomSectorsArc: false,
		showTopSectorsArc: false,
  };

  const clockChart = new MultiCircleChart('daily-schedule');
  clockChart.addConfig(clockConfig);
  clockChart.draw();

  // Update the clock every second
  setInterval(() => updateClock(clockChart), 1000);
}

function generateClockKeys() {
  let keys = [];
	let clockInterval = 1;
  for (let i = 0; i < 60; i++) {
		if (i % 5 === 0) {
			keys.push((clockInterval++).toString());
		} else {
			keys.push('');
		}
  }
  return keys;
}

function generateClockFillColors(startIndex = 60) {
  let fillColors = [];
	const sectors = 5;
  const hueStep = 360 / sectors; // Divide the hue wheel into sectors steps
  const totalSectors = 60;
  const offsetIndex = startIndex % totalSectors; // Ensure the start index is within bounds

  for (let i = 0; i < totalSectors; i++) {
    let adjustedIndex = (i + offsetIndex) % totalSectors;
    
    const hueSegment = Math.floor(adjustedIndex / sectors);
    const hue = hueSegment * hueStep;

    const color = `hsla(${hue}, 75%, 65%, .2)`; // Adjust saturation, lightness, alpha as needed
    fillColors.push(color);
  }

  return fillColors;
}


function updateClock(clockChart) {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  // Update the chart to reflect the current time.
  // This might involve recalculating the outer and inner radii or adjusting the sectors' fill colors.
  // Since the library does not directly support dynamic updates like this, you might need to adjust the library or
  // use a different method to visually represent the passing of time.

  // Placeholder for the update logic
  // console.log(hours, minutes, seconds); // Implement based on your library's capabilities
}


initializeClock();