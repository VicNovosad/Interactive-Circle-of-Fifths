function MultiCircleChart(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.context = this.canvas.getContext('2d');
  this.configs = []; // Array to hold multiple chart configurations

  this.addConfig = function(config) {
      const sectorsQuantity = config.sectorsQuantity || config.keys.length;
      // const circleInTheCenter = config.circleInTheCenter || false;
      // console.log(circleInTheCenter);
      
      // Helper function to ensure arrays are of the correct length, filled with true if too short
      const ensureArrayLength = (array, length) => {
        if (array.length < length) {
            return array.concat(new Array(length - array.length).fill(true));
        }
          return array;
      };

      this.configs.push({
          outerRadius: config.outerRadius,
          innerRadius: config.innerRadius,
          sectorsQuantity: sectorsQuantity,
          circleRotation: config.circleRotation * Math.PI / 180, // Convert degrees to radians
          titlesRotation: config.titlesRotation * Math.PI / 180, // Convert degrees to radians
          keys: config.keys,
          lineColor: config.lineColor || 'black', // Default line color
          lineWidth: config.lineWidth || 1, // Default line width
          fillColors: config.fillColors || [], // Default to empty array
          textColor: config.textColor || 'black', // Default text color
          textSize: config.textSize || '16px', // Default text size
          textWeight: config.textWeight || 'normal', // Default text weight
          textXShift: config.textXShift || 0, // Default X shift of 0
          textYShift: config.textYShift || 0, // Default Y shift of 0
          showSectors: config.showSectors || [],
          showBoundaryCircles: config.showBoundaryCircles !== undefined ? config.showBoundaryCircles : false, // Default to false
          showLeftSectorsLine:  ensureArrayLength(config.showLeftSectorsLine || [], sectorsQuantity),
          showRightSectorsLine:  ensureArrayLength(config.showRightSectorsLine || [], sectorsQuantity),
          showBottomSectorsArc:  ensureArrayLength(config.showBottomSectorsArc || [], sectorsQuantity),
          showTopSectorsArc:  ensureArrayLength(config.showTopSectorsArc || [], sectorsQuantity),
          circleInTheCenter: config.circleInTheCenter || false,
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
          console.log(config.innerRadius);
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
      this.drawSectorText(config, key, centerX, centerY, titleAngle);
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

  // this.context.strokeStyle = 'blue';
  this.drawSectorLines = function(config, centerX, centerY, sectorAngle, sectorsAngle, index) {
      if (config.innerRadius > 0) {
          this.drawLeftSide(config, centerX, centerY, sectorAngle, sectorsAngle, index);
          this.drawRightSide(config, centerX, centerY, sectorAngle, sectorsAngle, index);
          this.drawTopArc(config, centerX, centerY, sectorAngle, sectorsAngle, index);
          this.drawBottomArc(config, centerX, centerY, sectorAngle, sectorsAngle, index);
          
          // this.context.beginPath();
          // this.context.lineWidth = config.lineWidth;
          // this.context.moveTo(centerX + Math.cos(sectorAngle - sectorsAngle / 2) * config.innerRadius, centerY + Math.sin(sectorAngle - sectorsAngle / 2) * config.innerRadius);
          // this.context.lineTo(centerX + Math.cos(sectorAngle - sectorsAngle / 2) * config.outerRadius, centerY + Math.sin(sectorAngle - sectorsAngle / 2) * config.outerRadius);
          // this.context.arc(centerX, centerY, config.outerRadius, sectorAngle - sectorsAngle / 2, sectorAngle + sectorsAngle / 2, false);
          // this.context.lineTo(centerX + Math.cos(sectorAngle + sectorsAngle / 2) * config.innerRadius, centerY + Math.sin(sectorAngle + sectorsAngle / 2) * config.innerRadius);
          // this.context.arc(centerX, centerY, config.innerRadius, sectorAngle + sectorsAngle / 2, sectorAngle - sectorsAngle / 2, true);
          // this.context.closePath();
          // this.context.stroke();
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


  this.drawSectorText = function(config, key, centerX, centerY, titleAngle) {
      if (key !== "") {
          const textX = centerX + (Math.cos(titleAngle) * (config.outerRadius + (config.innerRadius > 0 ? config.innerRadius : 0))) / 2;
          const textY = centerY + (Math.sin(titleAngle) * (config.outerRadius + (config.innerRadius > 0 ? config.innerRadius : 0))) / 2;
          const shiftedTextX = textX + config.textXShift;// Apply the shift X values
          const shiftedTextY = textY + config.textYShift;// Apply the shift Y values
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
            const radians = rotationDegrees * Math.PI / 180; // Convert degrees to radians
            this.configs[chartIndex].circleRotation = radians;
            this.configs[chartIndex].titlesRotation = radians;
        } else {
            console.log("Invalid chart index:", chartIndex);
        }
    });

    this.draw(); // Redraw once after updating all necessary configurations
  };

}
