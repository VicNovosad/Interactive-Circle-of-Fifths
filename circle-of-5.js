
document.addEventListener('DOMContentLoaded', function() {
	gsap.registerPlugin(Draggable);
	
	const circleOfFiveChart = new MultiCircleChart('canvas');
	const canvas = document.getElementById('canvas');
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
	
	// circleOfFiveChart.rotateChart([0,1,2], newAngleDegrees);

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
				duration: .5, // Adjust the duration for a smoother transition
				ease: "ease", // Apply an easing function for a smoother effect
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
