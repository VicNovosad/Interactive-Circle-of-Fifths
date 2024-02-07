document.addEventListener('DOMContentLoaded', function() {

	let isRotating = false; // Tracks if rotation is active (mouse is pressed)
	let initialMouseAngle = null; // Stores the initial angle of the mouse relative to the center
	let initialSliceAngle = 0; // Stores the initial angle of the slice before rotation starts

	
	const circleOfFiveChart = new MultiCircleChart('canvas');

	// Add configurations for each type of chord
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

	document.getElementById('saveBtn').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const dataUrl = canvas.toDataURL('image/png'); // Get image data as a PNG URL

    // Create a temporary link to initiate the download
    const link = document.createElement('a');
    link.download = 'canvas-image.png'; // Set the download filename
    link.href = dataUrl;
    document.body.appendChild(link); // Required for Firefox
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  });

	function startRotation(x, y) {
		const rect = canvas.getBoundingClientRect();
		const inputX = x - rect.left;
		const inputY = y - rect.top;
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		initialMouseAngle = Math.atan2(inputY - centerY, inputX - centerX);
		isRotating = true;
	}

	function rotate(x, y) {
			if (!isRotating) return;
			const rect = canvas.getBoundingClientRect();
			const inputX = x - rect.left;
			const inputY = y - rect.top;
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;
			let currentMouseAngle = Math.atan2(inputY - centerY, inputX - centerX);
			let angleDifference = currentMouseAngle - initialMouseAngle;
			let newAngleDegrees = ((initialSliceAngle + angleDifference) * (180 / Math.PI));
			newAngleDegrees = Math.round(newAngleDegrees / 30) * 30;
			circleOfFiveChart.rotateChart([0,1,2], newAngleDegrees);
	}

	function endRotation() {
			isRotating = false;
			initialMouseAngle = null;
	}

	canvas.addEventListener("mousedown", function(event) {
			startRotation(event.clientX, event.clientY);
	});

	canvas.addEventListener("mousemove", function(event) {
			rotate(event.clientX, event.clientY);
	});

	document.addEventListener("mouseup", function() {
			endRotation();
	});

	// Touch event handlers
	canvas.addEventListener('touchstart', function(event) {
			if (event.touches.length === 1) {
					const touch = event.touches[0];
					startRotation(touch.clientX, touch.clientY);
					event.preventDefault(); // Prevent scrolling
			}
	}, { passive: false });

	canvas.addEventListener('touchmove', function(event) {
			if (event.touches.length === 1) {
					const touch = event.touches[0];
					rotate(touch.clientX, touch.clientY);
					event.preventDefault();
			}
	}, { passive: false });

	canvas.addEventListener('touchend', function(event) {
			endRotation();
	});

});
