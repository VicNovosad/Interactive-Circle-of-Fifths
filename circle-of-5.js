
document.addEventListener('DOMContentLoaded', function() {
	gsap.registerPlugin(Draggable);
	
	const circleOfFiveChart = new MultiCircleChart('canvas-circle-of-five');
	const canvas = document.getElementById('canvas-circle-of-five');
	const snapStep = 30;
	
	circleOfFiveChart.addConfig(majorChords);
	circleOfFiveChart.addConfig(minorChords);
	circleOfFiveChart.addConfig(diminishedChords);
	circleOfFiveChart.addConfig(majorRedFrameConfig);
	circleOfFiveChart.addConfig(manorRedFrameConfig);
	circleOfFiveChart.addConfig(diminishedRedFrameConfig);
	circleOfFiveChart.addConfig(secondaryDominantRedFrameConfig);
	circleOfFiveChart.addConfig(secondaryDominant2RedFrameConfig);
	
	// Draw all configured charts
	circleOfFiveChart.draw();

	const rotateWordsSwitch =  document.getElementById('rotateWordsSwitch')
	rotateWordsSwitch.checked = RotateWords;
	rotateWordsSwitch.addEventListener('change', function() {
		RotateWords = this.checked;
		console.log('RotateWords is now:', RotateWords); // For demonstration
  	circleOfFiveChart.updateRotateWordsSetting([0, 1, 2], RotateWords);
	});
	
	// circleOfFiveChart.rotateChart([0,1,2], newAngleDegrees);

	document.getElementById('saveBtn').addEventListener('click', function() {
    const canvas = document.getElementById('canvas-circle-of-five');
    const dataUrl = canvas.toDataURL('image/png'); // Get image data as a PNG URL

    // Create a temporary link to initiate the download
    const link = document.createElement('a');
    link.download = 'canvas-image.png'; // Set the download filename
    link.href = dataUrl;
    document.body.appendChild(link); // Required for Firefox
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  });

	// Set the initial rotation of the draggableRotator
	gsap.set("#draggableRotator", { rotation: -90 });

	Draggable.create("#draggableRotator", {
		type: "rotation",
		onDrag: function() {
			// Directly update the chart's rotation based on the current rotation
			circleOfFiveChart.rotateChart([0,1,2], this.rotation);
		},
		onRelease: function() {
			// Calculate the snap based on the custom snap step
			var snapRotation = Math.round(this.rotation / snapStep) * snapStep;
	
			// Animate the draggableRotator element to the snapped rotation
			gsap.to(this.target, {
				rotation: snapRotation,
				duration: 1, // Adjust the duration for a smoother transition
				ease: "sine.inOut", // Apply an easing function for a smoother effect
				onUpdate: () => {
					// Synchronize the chart's rotation with the draggableRotator element during the animation
					const currentRotation = gsap.getProperty(this.target, "rotation");
					circleOfFiveChart.rotateChart([0,1,2], currentRotation);
				},
				onComplete: () => {
					// Ensure the chart is exactly at the final snapped rotation
					circleOfFiveChart.rotateChart([0,1,2], snapRotation);
				}
			});
		}
	});

	// // Define an object to animate a property that will represent your rotation degree
	// let animationTarget = { rotation: 0 };

	// // Assuming `currentRotation` is your target rotation angle
	// let currentRotation = 360; // Example target angle, adjust as needed

	// // GSAP to() method to animate
	// gsap.to(animationTarget, {
	// 	rotation: currentRotation, // Target rotation value
	// 	duration: 5, // Duration of the animation in seconds, adjust to control speed
	// 	ease: "none", // Use a linear ease for consistent rotation speed
	// 	onUpdate: function() {
	// 		// This function is called on each tick of the animation
	// 		// Call your rotateChart function with the updated rotation value
	// 		// The Math.round() is used to increment in steps of 0.1; adjust as needed
	// 		ColorWheel.rotateChart([0,1,2], Math.round(animationTarget.rotation * 10) / 10);
	// 	}
	// });

// Initialize variables to store the current rotation for each chart
let currentRotation = {
	1: 0, // Initial rotation for chart 1
	2: 0  // Initial rotation for chart 2
};

function updateChart(chartId, rotation) {
	// Update the current rotation state
	currentRotation[chartId] = rotation;
	
	// Continue with rotating the chart
	ColorWheel.rotateChart(chartId, rotation);
}


function getRandomSpeed(minSpeed, maxSpeed) {
	return Math.random() * (maxSpeed - minSpeed) + minSpeed;
}

function calculateDurationFromSpeed(speed) {
    const totalRotation = 360; // Total degrees to rotate
    return totalRotation / speed; // Duration in seconds
}

function getRandomDirection() {
    return Math.random() > 0.5 ? 360 : -360; // Randomly choose between clockwise and counterclockwise
}

// Common function to update the chart rotation
function updateChart(chartId, rotation) {
    ColorWheel.rotateChart(chartId, Math.round(rotation * 10) / 10);
}

// Function to initialize or reinitialize the animation with new random parameters
function initializeAnimation() {
	let tl = gsap.timeline({paused: true, repeat: -1, yoyo: true});

	const minSpeed = 20;
	const maxSpeed = 60;

	// Use the current rotation as the starting point for the animation
	tl.to({rotation: currentRotation[1]}, {
			rotation: getRandomDirection() + currentRotation[1], // Adjust target based on current rotation
			duration: 20,
			// duration: calculateDurationFromSpeed(getRandomSpeed(minSpeed, maxSpeed)),
			ease: "none",
			onUpdate: function() {
					updateChart(0, this.targets()[0].rotation);
			}
	}, 0);

	tl.to({rotation: currentRotation[2]}, {
			rotation: getRandomDirection() + currentRotation[2], // Adjust target based on current rotation
			duration: calculateDurationFromSpeed(getRandomSpeed(minSpeed, maxSpeed)),
			ease: "none",
			onUpdate: function() {
					updateChart(2, this.targets()[0].rotation);
			}
	}, 0);
	tl.to({rotation: currentRotation[2]}, {
			rotation: getRandomDirection() + currentRotation[2], // Adjust target based on current rotation
			duration: calculateDurationFromSpeed(getRandomSpeed(minSpeed, maxSpeed)),
			ease: "none",
			onUpdate: function() {
					updateChart(4, this.targets()[0].rotation);
			}
	}, 0);
	tl.to({rotation: currentRotation[2]}, {
			rotation: getRandomDirection() + currentRotation[2], // Adjust target based on current rotation
			duration: calculateDurationFromSpeed(getRandomSpeed(minSpeed, maxSpeed)),
			ease: "none",
			onUpdate: function() {
					updateChart(5, this.targets()[0].rotation);
			}
	}, 0);
	tl.to({rotation: currentRotation[2]}, {
			rotation: getRandomDirection() + currentRotation[2], // Adjust target based on current rotation
			duration: calculateDurationFromSpeed(getRandomSpeed(minSpeed, maxSpeed)),
			ease: "none",
			onUpdate: function() {
					updateChart(7, this.targets()[0].rotation);
			}
	}, 0);

	return tl;
}


const canvasColorWheel = document.getElementById('canvas-color-wheel');

let currentAnimation = null; // Hold the current animation timeline
currentAnimation = initializeAnimation();

canvasColorWheel.addEventListener('mouseenter', function() {
    // Stop and clear the current animation if it exists
    if (currentAnimation) {
        // currentAnimation.kill();
    }
    // Initialize a new animation with random parameters
    currentAnimation.play();
});

canvasColorWheel.addEventListener('mouseleave', function() {
    // Pause the animation when the mouse leaves
    if (currentAnimation) {
        currentAnimation.pause();
    }
});






});
