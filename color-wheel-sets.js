const ColorLayer1 = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 270,
	innerRadius: 220,
	sectorsQuantity: 12,
	circleRotation: -90,
  fillColors: ["#FFFF00", "#9ACD32", "#008000", "#008080", "#0000FF", "#4B0082", "#8A2BE2", "#FF00FF", "#FF0000", "#FF4500", "#FFA500", "#FFD700"],
  lineColor: 'rgba(255,255,255, .6)',
  lineWidth: 2,
};

const ColorLayer1Top = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 270,
	innerRadius: 220,
	sectorsQuantity: 12,
  fillColors: ["rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)"],
  lineColor: 'transparent',
};

const ColorLayer2 = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 220,
	innerRadius: 170,
	sectorsQuantity: 12,
	circleRotation: -90,
  fillColors: ["#FFFF00", "#9ACD32", "#008000", "#008080", "#0000FF", "#4B0082", "#8A2BE2", "#FF00FF", "#FF0000", "#FF4500", "#FFA500", "#FFD700"],
  lineColor: 'rgba(255,255,255, .4)',
  lineWidth: 2,
};

const ColorLayer2Top = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 220,
	innerRadius: 170,
	sectorsQuantity: 12,
  fillColors: ["rgba(0,0,0, .2)", "rgba(0,0,0, .2)", "rgba(0,0,0, .2)", "rgba(0,0,0, .2)", "rgba(0,0,0, .2)", "rgba(0,0,0, .2)", "rgba(0,0,0, .2)", "rgba(0,0,0, .2)", "rgba(0,0,0, .2)", "rgba(0,0,0, .2)", "rgba(0,0,0, .2)", "rgba(0,0,0, .2)"],
  lineColor: 'transparent',
};

const ColorLayer3 = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 170,
	innerRadius: 120,
	sectorsQuantity: 12,
	circleRotation: -90,
  fillColors: ["#FFFF00", "#9ACD32", "#008000", "#008080", "#0000FF", "#4B0082", "#8A2BE2", "#FF00FF", "#FF0000", "#FF4500", "#FFA500", "#FFD700"],
  lineColor: 'rgba(255,255,255, .4)',
  lineWidth: 2,
};

const ColorLayer4 = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 120,
	innerRadius: 70,
	sectorsQuantity: 12,
	circleRotation: -90,
  fillColors: ["#FFFF00", "#9ACD32", "#008000", "#008080", "#0000FF", "#4B0082", "#8A2BE2", "#FF00FF", "#FF0000", "#FF4500", "#FFA500", "#FFD700"],
  lineColor: 'rgba(255,255,255, .6)',
  lineWidth: 2,
};

const ColorLayer4Top = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 120,
	innerRadius: 70,
	sectorsQuantity: 12,
  fillColors: ["rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)"],
  lineColor: 'transparent',
};

const ColorLayer5 = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 70,
	innerRadius: 20,
	sectorsQuantity: 12,
	circleRotation: -90,
  fillColors: ["#FFFF00", "#9ACD32", "#008000", "#008080", "#0000FF", "#4B0082", "#8A2BE2", "#FF00FF", "#FF0000", "#FF4500", "#FFA500", "#FFD700"],
  lineColor: 'rgba(255,255,255, .6)',
  lineWidth: 2,
};

const ColorLayer5Top = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 70,
	innerRadius: 20,
	sectorsQuantity: 12,
  fillColors: ["rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)"],
  lineColor: 'transparent',
};

const ColorWheel = new MultiCircleChart('canvas-color-wheel');

ColorWheel.addConfig(ColorLayer1);
ColorWheel.addConfig(ColorLayer1Top);
ColorWheel.addConfig(ColorLayer2);
ColorWheel.addConfig(ColorLayer2Top);
ColorWheel.addConfig(ColorLayer3);
ColorWheel.addConfig(ColorLayer4);
ColorWheel.addConfig(ColorLayer4Top);
ColorWheel.addConfig(ColorLayer5);
ColorWheel.addConfig(ColorLayer5Top);

// Draw all configured charts
ColorWheel.draw();


// *** Animation ***

	// Define an object to animate a property that will represent your rotation degree
	function getRandomSpeed(minSpeed, maxSpeed) {
		return Math.random() * (maxSpeed - minSpeed) + minSpeed;
	}
	let currentRotation = 360; 
	let minSpeed = 10;
	let maxSpeed = 30;

	let animationTarget = { rotation: 0 };
	gsap.to(animationTarget, {
		rotation: currentRotation, // Target rotation value
		duration: getRandomSpeed(minSpeed, maxSpeed),
		repeat: -1, 
		yoyo: true,
		ease: "linear", // Use a linear ease for consistent rotation speed
		onUpdate: function() {
			ColorWheel.rotateChart(0, animationTarget.rotation );
		}
	});
	
	let animationTarget2 = { rotation: 0 };
	gsap.to(animationTarget2, {
		rotation: currentRotation, // Target rotation value
		duration: getRandomSpeed(minSpeed, maxSpeed),
		repeat: -1, 
		yoyo: true,
		ease: "linear", // Use a linear ease for consistent rotation speed
		onUpdate: function() {
			ColorWheel.rotateChart(2, animationTarget2.rotation );
		}
	});
	
	let animationTarget3 = { rotation: 0 };
	gsap.to(animationTarget3, {
		rotation: currentRotation, // Target rotation value
		duration: getRandomSpeed(minSpeed, maxSpeed),
		repeat: -1, 
		yoyo: true,
		ease: "linear", // Use a linear ease for consistent rotation speed
		onUpdate: function() {
			ColorWheel.rotateChart(4, animationTarget3.rotation );
		}
	});
	
	let animationTarget4 = { rotation: 0 };
	gsap.to(animationTarget4, {
		rotation: currentRotation, // Target rotation value
		duration: getRandomSpeed(minSpeed, maxSpeed),
		repeat: -1, 
		yoyo: true,
		ease: "linear", // Use a linear ease for consistent rotation speed
		onUpdate: function() {
			ColorWheel.rotateChart(5, animationTarget4.rotation );
		}
	});
	
	let animationTarget5 = { rotation: 0 };
	gsap.to(animationTarget5, {
		rotation: currentRotation, // Target rotation value
		duration: getRandomSpeed(minSpeed, maxSpeed),
		repeat: -1, 
		yoyo: true,
		ease: "linear", // Use a linear ease for consistent rotation speed
		onUpdate: function() {
			ColorWheel.rotateChart(7, animationTarget5.rotation );
		}
	});


	// // Initialize variables to store the current rotation for each chart
	// let currentRotation = {
	// 	1: 0, // Initial rotation for chart 1
	// 	2: 0  // Initial rotation for chart 2
	// };

	// function updateChart(chartId, rotation) {
	// 	// Update the current rotation state
	// 	currentRotation[chartId] = rotation;
		
	// 	// Continue with rotating the chart
	// 	ColorWheel.rotateChart(chartId, rotation);
	// }


	// function getRandomSpeed(minSpeed, maxSpeed) {
	// 	return Math.random() * (maxSpeed - minSpeed) + minSpeed;
	// }

	// function calculateDurationFromSpeed(speed) {
	// 		const totalRotation = 360; // Total degrees to rotate
	// 		return totalRotation / speed; // Duration in seconds
	// }

	// function getRandomDirection() {
	// 		return Math.random() > 0.5 ? 360 : -360; // Randomly choose between clockwise and counterclockwise
	// }

	// // Common function to update the chart rotation
	// function updateChart(chartId, rotation) {
	// 		ColorWheel.rotateChart(chartId, Math.round(rotation * 10) / 10);
	// }

	// // Function to initialize or reinitialize the animation with new random parameters
	// function initializeAnimation() {
	// 	let tl = gsap.timeline({paused: true, repeat: -1, yoyo: true});

	// 	const minSpeed = 20;
	// 	const maxSpeed = 60;

	// 	// Use the current rotation as the starting point for the animation
	// 	tl.to({rotation: currentRotation[1]}, {
	// 			rotation: getRandomDirection() + currentRotation[1], // Adjust target based on current rotation
	// 			duration: 20,
	// 			// duration: calculateDurationFromSpeed(getRandomSpeed(minSpeed, maxSpeed)),
	// 			ease: "none",
	// 			onUpdate: function() {
	// 					updateChart(0, this.targets()[0].rotation);
	// 			}
	// 	}, 0);

	// 	tl.to({rotation: currentRotation[2]}, {
	// 			rotation: getRandomDirection() + currentRotation[2], // Adjust target based on current rotation
	// 			duration: calculateDurationFromSpeed(getRandomSpeed(minSpeed, maxSpeed)),
	// 			ease: "none",
	// 			onUpdate: function() {
	// 					updateChart(2, this.targets()[0].rotation);
	// 			}
	// 	}, 0);
	// 	tl.to({rotation: currentRotation[2]}, {
	// 			rotation: getRandomDirection() + currentRotation[2], // Adjust target based on current rotation
	// 			duration: calculateDurationFromSpeed(getRandomSpeed(minSpeed, maxSpeed)),
	// 			ease: "none",
	// 			onUpdate: function() {
	// 					updateChart(4, this.targets()[0].rotation);
	// 			}
	// 	}, 0);
	// 	tl.to({rotation: currentRotation[2]}, {
	// 			rotation: getRandomDirection() + currentRotation[2], // Adjust target based on current rotation
	// 			duration: calculateDurationFromSpeed(getRandomSpeed(minSpeed, maxSpeed)),
	// 			ease: "none",
	// 			onUpdate: function() {
	// 					updateChart(5, this.targets()[0].rotation);
	// 			}
	// 	}, 0);
	// 	tl.to({rotation: currentRotation[2]}, {
	// 			rotation: getRandomDirection() + currentRotation[2], // Adjust target based on current rotation
	// 			duration: calculateDurationFromSpeed(getRandomSpeed(minSpeed, maxSpeed)),
	// 			ease: "none",
	// 			onUpdate: function() {
	// 					updateChart(7, this.targets()[0].rotation);
	// 			}
	// 	}, 0);

	// 	return tl;
	// }


	// const canvasColorWheel = document.getElementById('canvas-color-wheel');

	// let currentAnimation = null; // Hold the current animation timeline
	// currentAnimation = initializeAnimation();

	// canvasColorWheel.addEventListener('mouseenter', function() {
	// 		// Stop and clear the current animation if it exists
	// 		if (currentAnimation) {
	// 				// currentAnimation.kill();
	// 		}
	// 		// Initialize a new animation with random parameters
	// 		currentAnimation.play();
	// });

	// canvasColorWheel.addEventListener('mouseleave', function() {
	// 		// Pause the animation when the mouse leaves
	// 		if (currentAnimation) {
	// 				currentAnimation.pause();
	// 		}
	// });
