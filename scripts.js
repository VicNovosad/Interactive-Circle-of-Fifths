document.addEventListener("DOMContentLoaded", function () {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const baseImage = new Image();
	const sliceImage = new Image();
	let sliceAngle = 0;
	let rotationEnabled = false; // Initially allow rotation

  baseImage.src = "/assets/base.jpg";
	sliceImage.src = "/assets/sector.png";

	baseImage.onload = function () {
		// Adjust canvas size to match the base image
		canvas.width = baseImage.width;
		canvas.height = baseImage.height;
		draw();
	};

	function drawBaseImage() {
		ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
	}

	function drawSlice() {
		ctx.save();
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		ctx.translate(centerX, centerY);
		ctx.rotate(sliceAngle);
		ctx.drawImage(sliceImage, -sliceImage.width / 2, -sliceImage.height / 2);
		ctx.restore();
	}

	function updateSlicePosition(mouseX, mouseY) {
		if (!rotationEnabled) return; // Skip updating position if rotation is disabled

		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		let angleToMouse = Math.atan2(mouseY - centerY, mouseX - centerX);
		angleToMouse += Math.PI / 2; // Add 90 degrees (in radians) to correct the angle

		// Adjust angle to snap to 30-degree increments
		const degrees = angleToMouse * (180 / Math.PI);
		const snappedDegrees = Math.round(degrees / 30) * 30;
		sliceAngle = snappedDegrees * (Math.PI / 180); // Convert back to radians for rotation
		draw();
	}

	function toggleRotation() {
		rotationEnabled = !rotationEnabled; // Toggle rotation on/off with mouse clicks
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBaseImage();
		drawSlice();
	}

	canvas.addEventListener("mousemove", function (event) {
		const rect = canvas.getBoundingClientRect();
		const mouseX = event.clientX - rect.left;
		const mouseY = event.clientY - rect.top;
		updateSlicePosition(mouseX, mouseY);
	});

	canvas.addEventListener("click", toggleRotation); // Toggle rotation on/off with mouse clicks
});
