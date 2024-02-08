function MultiCircleChart(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.context = this.canvas.getContext('2d');
  this.configs = []; // Array to hold multiple chart configurations

  this.addConfig = function(config) {
    const sectorsQuantity = config.sectorsQuantity || config.keys.length;
    
    // Helper function to ensure arrays are of the correct length, filled with true if too short
    const ensureArrayLength = (array, length, fillValue = true) => {
        if (!Array.isArray(array)) {
            return new Array(length).fill(array); // Use `array` as the fillValue since `array` is the value provided
        } else if (array.length < length) {
            return array.concat(new Array(length - array.length).fill(fillValue));
        }
        return array;
    };

    // Determine if rotateWordsWithSectors is explicitly set to false, default is true
    const rotateWordsWithSectors = false;
    // const rotateWordsWithSectors = config.rotateWordsWithSectors !== false;

    let innerTextRotation = ensureArrayLength(config.innerTextRotation || [], sectorsQuantity, 0);
    if (rotateWordsWithSectors) {
        innerTextRotation = new Array(sectorsQuantity).fill(0).map((_, index) => index * (360 / sectorsQuantity));
    } 

    this.configs.push({
        outerRadius: config.outerRadius,
        innerRadius: config.innerRadius,
        sectorsQuantity: sectorsQuantity,
        showSectors: config.showSectors || [],
            
        circleRotation: this.degToRad(config.circleRotation) || 0,
        titlesRotation: this.degToRad(config.titlesRotation) || 0,
        keys: ensureArrayLength(config.keys || [], sectorsQuantity, ''),

        lineColor: config.lineColor || 'black', // Default line color
        lineWidth: config.lineWidth || 1, // Default line width
        fillColors: config.fillColors || [], // Default to empty array
        
        textSize: config.textSize || '16px', // Default text size
        textColor: config.textColor || 'black', // Default text color
        textWeight: config.textWeight || 'normal', // Default text weight
        textXShift: config.textXShift || 0, // Default X shift of 0
        textYShift: config.textYShift || 0, // Default Y shift of 0
        innerTextRotation: innerTextRotation,
        // innerTextRotation: ensureArrayLength(config.innerTextRotation || [], sectorsQuantity, 0), // Default rotation of 0 degrees for each sector
        
        showLeftSectorsLine:  ensureArrayLength(config.showLeftSectorsLine || [], sectorsQuantity),
        showRightSectorsLine:  ensureArrayLength(config.showRightSectorsLine || [], sectorsQuantity),
        showBottomSectorsArc:  ensureArrayLength(config.showBottomSectorsArc || [], sectorsQuantity),
        showTopSectorsArc:  ensureArrayLength(config.showTopSectorsArc || [], sectorsQuantity),
        showBoundaryCircles: config.showBoundaryCircles !== undefined ? config.showBoundaryCircles : false, // Default to false
        circleInTheCenter: config.circleInTheCenter || false,
    });
  };

  this.degToRad = function(degrees) {
    return degrees * Math.PI / 180;
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
        const textRotation = this.degToRad(config.innerTextRotation[index]); // Convert degrees to radians
        const textX = centerX + (Math.cos(titleAngle) * (config.outerRadius + (config.innerRadius > 0 ? config.innerRadius : 0))) / 2;
        const textY = centerY + (Math.sin(titleAngle) * (config.outerRadius + (config.innerRadius > 0 ? config.innerRadius : 0))) / 2;
        const shiftedTextX = textX + config.textXShift;// Apply the shift X values
        const shiftedTextY = textY + config.textYShift;// Apply the shift Y values

        // // Save the current context state
        // this.context.save();
        // this.context.translate(shiftedTextX, shiftedTextY);
        // this.context.rotate(textRotation);
        // this.context.fillStyle = config.textColor;
        // this.context.font = `${config.textWeight} ${config.textSize} Arial`;
        // this.context.textAlign = "center";
        // this.context.textBaseline = "middle";
        // this.context.fillText(key, 0, 0); // Draw text at the rotated position

        // // Restore the context to its original state
        // this.context.restore();

        this.context.fillStyle = config.textColor;
        this.context.font = `${config.textWeight} ${config.textSize} Arial`;
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillText(key, shiftedTextX, shiftedTextY);
      }
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

    this.draw(); // Redraw once after updating all necessary configurations
  };

}
