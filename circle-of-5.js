
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

});
