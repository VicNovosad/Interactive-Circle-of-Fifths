function MultiCircleChart(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.context = this.canvas.getContext('2d');
  this.configs = []; // Array to hold multiple chart configurations
  this.loadedImages = []; // Store preloaded images

  this.addConfig = function(config) {
    const sectorsQuantity = config.sectorsQuantity || config.keys.length;
    
    this.configs.push({
        outerRadius: config.outerRadius,
        innerRadius: config.innerRadius,
        sectorsQuantity: sectorsQuantity,
        showSectors: config.showSectors || [],
            
        circleRotation: this.degToRad(config.circleRotation) || 0,
        titlesRotation: this.degToRad(config.titlesRotation) || 0,
        keys: this.ensureArrayLength(config.keys || [], sectorsQuantity, ''),

        lineColor: config.lineColor || 'black', // Default line color
        lineWidth: config.lineWidth || 1, // Default line width
        fillColors: config.fillColors || [], // Default to empty array
        
        textSize: config.textSize || '16px', // Default text size
        textColor: config.textColor || 'black', // Default text color
        textWeight: config.textWeight || 'normal', // Default text weight
        textXShift: config.textXShift || 0, // Default X shift of 0
        textYShift: config.textYShift || 0, // Default Y shift of 0
        innerTextRotation: this.ensureArrayLength(config.innerTextRotation || [], sectorsQuantity, 0), // Default rotation of 0 degrees for each sector
        rotateWordsWithSectors: this.ensureArrayLength(config.rotateWordsWithSectors || [], sectorsQuantity, false),
        sectorImages: this.ensureArrayLength(config.sectorImages || [], sectorsQuantity, null),
        rotateImagesWithSectors: this.ensureArrayLength(config.rotateImagesWithSectors || [], sectorsQuantity, false),
        
        showLeftSectorsLine:  this.ensureArrayLength(config.showLeftSectorsLine || [], sectorsQuantity),
        showRightSectorsLine:  this.ensureArrayLength(config.showRightSectorsLine || [], sectorsQuantity),
        showBottomSectorsArc:  this.ensureArrayLength(config.showBottomSectorsArc || [], sectorsQuantity),
        showTopSectorsArc:  this.ensureArrayLength(config.showTopSectorsArc || [], sectorsQuantity),
        // clearMode:  this.ensureArrayLength(config.clearMode || [], sectorsQuantity, false),
        showBoundaryCircles: config.showBoundaryCircles !== undefined ? config.showBoundaryCircles : false, // Default to false
        circleInTheCenter: config.circleInTheCenter || false,
    });
  };

   // Method to ensure arrays are of the correct length, filled with fillValue if too short
  this.ensureArrayLength = function(array, length, fillValue = true) {
    if (!Array.isArray(array)) {
      return new Array(length).fill(array); // Use `array` as the fillValue since `array` is the value provided
    } else if (array.length < length) {
      return array.concat(new Array(length - array.length).fill(fillValue));
    }
    return array;
  };

  this.degToRad = function(degrees) {
    return degrees * Math.PI / 180;
  };

  this.preloadImages = function() {
    const imageUrls = this.configs.flatMap(config => config.sectorImages.filter(url => url)); // Filter out falsy values
    const uniqueUrls = [...new Set(imageUrls)];
    
    // Map each URL to a promise that resolves when the image is loaded
    const loadPromises = uniqueUrls.map(url => {
      return new Promise((resolve, reject) => {
        if (!this.loadedImages[url]) { // Only load if not already loaded
          const img = new Image();
          img.onload = () => {
            this.loadedImages[url] = img;
            resolve(); // Resolve the promise when the image is loaded
          };
          img.onerror = reject; // Reject the promise on an error
          img.src = url;
        } else {
          resolve(); // Immediately resolve if already loaded
        }
      });
    });
    
    return Promise.all(loadPromises); // Return a promise that resolves when all images are loaded
  };

  this.startDrawing = function() {
    this.preloadImages().then(() => {
      this.draw(); // Start drawing only after all images are preloaded
    }).catch(error => {
      console.error("Error preloading images:", error);
    });
  };

  this.draw = function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.configs.forEach((config) => {
          this.drawChart(config);
      });
  };

  this.drawChart = function(config) {
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      const sectorsAngle = (Math.PI * 2) / config.sectorsQuantity;
      this.context.strokeStyle = config.lineColor;

      for (let i = 0; i < config.sectorsQuantity; i++) {
          if (config.showSectors.length > 0 && config.showSectors[i] === false) {
              continue; // Skip this iteration if showSectors[i] is explicitly false
          }
          this.drawSector(config, i, centerX, centerY, sectorsAngle);
      }

      if (config.innerRadius > 0 && config.showBoundaryCircles) {
          this.drawBoundaryCircles(centerX, centerY, config);
          if(config.circleInTheCenter){
            this.circleInTheCenter(config.innerRadius * 2 - 2, config.circleInTheCenter);
          }
      }

  };

  this.drawSector = function(config, index, centerX, centerY, sectorsAngle) {
      const sectorAngle = sectorsAngle * index + config.circleRotation;
      const titleAngle = sectorsAngle * index + config.titlesRotation;
      const keyIndex = index % config.keys.length;
      const key = index < config.keys.length ? config.keys[keyIndex] : ""; // Use empty string for extra sectors

      this.fillSector(config, index, centerX, centerY, sectorAngle, sectorsAngle);
      this.drawSectorLines(config, centerX, centerY, sectorAngle, sectorsAngle, index);
      this.drawSectorText(config, key, centerX, centerY, titleAngle, index);
      this.drawSectorImage(config, index, centerX, centerY, sectorAngle, sectorsAngle);
  };

  this.fillSector = function(config, index, centerX, centerY, sectorAngle, sectorsAngle) {
      if (config.fillColors && config.fillColors.length > 0) {
          const fillColorIndex = index % config.fillColors.length;
          this.context.fillStyle = config.fillColors[fillColorIndex];
          this.context.beginPath();
          this.context.moveTo(centerX, centerY);
          this.context.arc(centerX, centerY, config.outerRadius, sectorAngle - sectorsAngle / 2, sectorAngle + sectorsAngle / 2, false);
          if (config.innerRadius > 0) {
              this.context.arc(centerX, centerY, config.innerRadius, sectorAngle + sectorsAngle / 2, sectorAngle - sectorsAngle / 2, true);
          } else {
              this.context.lineTo(centerX, centerY);
          }
          this.context.closePath();
          this.context.fill();
      }
  };

  this.drawSectorLines = function(config, centerX, centerY, sectorAngle, sectorsAngle, index) {
      if (config.innerRadius > 0) {
          this.drawLeftSide(config, centerX, centerY, sectorAngle, sectorsAngle, index);
          this.drawRightSide(config, centerX, centerY, sectorAngle, sectorsAngle, index);
          this.drawTopArc(config, centerX, centerY, sectorAngle, sectorsAngle, index);
          this.drawBottomArc(config, centerX, centerY, sectorAngle, sectorsAngle, index);
      }
  };

  this.drawLeftSide = function(config, centerX, centerY, sectorAngle, sectorsAngle, index) {
    if (!config.showLeftSectorsLine[index]) return;

    this.context.beginPath();
    this.context.lineWidth = config.lineWidth;
    this.context.moveTo(centerX + Math.cos(sectorAngle - sectorsAngle / 2) * config.innerRadius,centerY + Math.sin(sectorAngle - sectorsAngle / 2) * config.innerRadius);
    this.context.lineTo(centerX + Math.cos(sectorAngle - sectorsAngle / 2) * config.outerRadius,centerY + Math.sin(sectorAngle - sectorsAngle / 2) * config.outerRadius);
    this.context.stroke();
  };

  this.drawRightSide = function(config, centerX, centerY, sectorAngle, sectorsAngle, index) {
    if (!config.showRightSectorsLine[index]) return;

    this.context.beginPath();
    this.context.lineWidth = config.lineWidth;
    this.context.moveTo(centerX + Math.cos(sectorAngle + sectorsAngle / 2) * config.innerRadius,centerY + Math.sin(sectorAngle + sectorsAngle / 2) * config.innerRadius);
    this.context.lineTo(centerX + Math.cos(sectorAngle + sectorsAngle / 2) * config.outerRadius,centerY + Math.sin(sectorAngle + sectorsAngle / 2) * config.outerRadius);
    this.context.stroke();
  };

  this.drawTopArc = function(config, centerX, centerY, sectorAngle, sectorsAngle, index) {
    if (!config.showTopSectorsArc[index]) return;

    this.context.beginPath();
    this.context.lineWidth = config.lineWidth;
    this.context.arc(centerX,centerY,config.outerRadius,sectorAngle - sectorsAngle / 2,sectorAngle + sectorsAngle / 2);
    this.context.stroke();
  };

  this.drawBottomArc = function(config, centerX, centerY, sectorAngle, sectorsAngle, index) {
    if (!config.showBottomSectorsArc[index]) return;

    if (config.innerRadius > 0) {
      this.context.beginPath();
      this.context.arc(centerX,centerY,config.innerRadius,sectorAngle - sectorsAngle / 2,sectorAngle + sectorsAngle / 2,false);
      this.context.lineWidth = config.lineWidth;
      this.context.stroke();
    }
  };

  this.drawSectorText = function(config, key, centerX, centerY, titleAngle, index) {
      if (key !== "") {
        let textRotation = this.degToRad(config.innerTextRotation[index]);
        if (config.rotateWordsWithSectors[index]) {
            const sectorAngle = (Math.PI * 2) / config.sectorsQuantity * index;
            textRotation = sectorAngle + config.circleRotation + Math.PI / 2;
        } 
        const textX = centerX + (Math.cos(titleAngle) * (config.outerRadius + (config.innerRadius > 0 ? config.innerRadius : 0))) / 2;
        const textY = centerY + (Math.sin(titleAngle) * (config.outerRadius + (config.innerRadius > 0 ? config.innerRadius : 0))) / 2;
        // Adjust shift based on sector's rotation
        const adjustedTextXShift = Math.cos(textRotation) * config.textXShift - Math.sin(textRotation) * config.textYShift;
        const adjustedTextYShift = Math.sin(textRotation) * config.textXShift + Math.cos(textRotation) * config.textYShift;

        // Apply adjusted shift to base text position
        const shiftedTextX = textX + adjustedTextXShift;
        const shiftedTextY = textY + adjustedTextYShift;

        // Save the current context state
        this.context.save();
        this.context.translate(shiftedTextX, shiftedTextY);
        this.context.rotate(textRotation);
        this.context.fillStyle = config.textColor;
        this.context.font = `${config.textWeight} ${config.textSize} Arial`;
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillText(key, 0, 0); // Draw text at the rotated position

        // Restore the context to its original state
        this.context.restore();
      }
  };

  this.drawSectorImage = function(config, index, centerX, centerY, sectorAngle, sectorsAngle) {
    const imageUrl = config.sectorImages[index];
    if (!imageUrl || !this.loadedImages[imageUrl]) return; // If there's no image for this sector, just return.

    const image = this.loadedImages[imageUrl]; // Directly use the preloaded image

    // Calculate the center position of the image
    const radiusMidpoint = config.innerRadius + (config.outerRadius - config.innerRadius) / 2;
    const baseImageX = centerX + Math.cos(sectorAngle) * radiusMidpoint;
    const baseImageY = centerY + Math.sin(sectorAngle) * radiusMidpoint;

    // Calculate the actual drawing position, taking into account the image's dimensions
    const imageX = baseImageX - image.width / 2;
    const imageY = baseImageY - image.height / 2;

    this.context.save(); // Save the current state of the canvas

    let imageRotation = 0;
    if (config.rotateImagesWithSectors[index]) {
        let additionalRotation = config.rotateImagesWithSectors[index];
        if (typeof additionalRotation === "number" && additionalRotation >= 0 && additionalRotation <= 360) {
            additionalRotation = this.degToRad(additionalRotation);
        } else {
            additionalRotation = 0;
        }
        imageRotation = sectorAngle + additionalRotation + Math.PI / 2; // Adjust for image centering
    }

    this.context.translate(baseImageX, baseImageY);
    this.context.rotate(imageRotation);
    this.context.translate(-baseImageX, -baseImageY);
    this.context.scale(1, 1.15);
    // this.context.transform(.1, 0, .2, .2, .1, .1); 
    this.context.shadowOffsetX = 5; 
    this.context.shadowOffsetY = 6; 
    this.context.shadowColor = "rgba(0, 0, 0, 0.5)";
    this.context.shadowBlur = 50;

    // Draw the image at the calculated position, now potentially rotated
    this.context.drawImage(image, imageX, imageY);

    this.context.restore(); // Restore the canvas state
  };


  this.drawBoundaryCircles = function(centerX, centerY, config) {
    this.context.beginPath();
    this.context.lineWidth = config.lineWidth;
    this.context.arc(centerX, centerY, config.outerRadius, 0, Math.PI * 2);
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(centerX, centerY, config.innerRadius, 0, Math.PI * 2);
    this.context.stroke();
  };

  // Method to draw a circle in the center of the canvas
  this.circleInTheCenter = function(circleSize, color = 'white') {
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;

      this.context.beginPath();
      this.context.arc(centerX, centerY, circleSize / 2, 0, 2 * Math.PI, false);
      this.context.fillStyle = color;
      this.context.fill();
      this.context.closePath();
  };

  this.rotateChart = function(chartIndexOrIndices, rotationDegrees) {
    const indices = Array.isArray(chartIndexOrIndices) ? chartIndexOrIndices : [chartIndexOrIndices];

    indices.forEach((chartIndex) => {
        if (chartIndex >= 0 && chartIndex < this.configs.length) {
            const radians = this.degToRad(rotationDegrees); // Convert degrees to radians
            this.configs[chartIndex].circleRotation = radians;
            this.configs[chartIndex].titlesRotation = radians;
        } else {
            console.log("Invalid chart index:", chartIndex);
        }
    });

    this.draw(); // Call draw directly for immediate updates
  };
  
  this.updateRotateWordsSetting = function(chartIndexOrIndices, newValue) {
    const indices = Array.isArray(chartIndexOrIndices) ? chartIndexOrIndices : [chartIndexOrIndices];
    
    indices.forEach((chartIndex) => {
      if (chartIndex >= 0 && chartIndex < this.configs.length) {
        // Update rotateWordsWithSectors for the specified config
        this.configs[chartIndex].rotateWordsWithSectors = this.ensureArrayLength([], this.configs[chartIndex].sectorsQuantity, newValue);
      } else {
        console.log("Invalid chart index:", chartIndex);
      }
    });
  
    this.draw(); // Redraw once after updating all necessary configurations
  };

}
