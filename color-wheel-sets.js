const ColorLayer1 = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 270,
	innerRadius: 220,
	sectorsQuantity: 12,
	circleRotation: -90,
  fillColors: ["#FFFF00", "#9ACD32", "#008000", "#008080", "#0000FF", "#4B0082", "#8A2BE2", "#FF00FF", "#FF0000", "#FF4500", "#FFA500", "#FFD700"],
  lineColor: 'rgba(255,255,255, .2)',
  lineWidth: 2,
};

const ColorLayer1Top = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 270,
	innerRadius: 220,
	sectorsQuantity: 12,
  fillColors: ["rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)", "rgba(0,0,0, .4)"],
  lineColor: 'rgba(255,255,255, .4)',
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
  lineColor: 'rgba(255,255,255, .2)',
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
  lineColor: 'rgba(255,255,255, .2)',
  lineWidth: 2,
};

const ColorLayer4Top = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 120,
	innerRadius: 70,
	sectorsQuantity: 12,
  fillColors: ["rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)", "rgba(255,255,255, .3)"],
  lineColor: 'rgba(255,255,255, .2)',
};

const ColorLayer5 = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 70,
	innerRadius: 20,
	sectorsQuantity: 12,
	circleRotation: -90,
  fillColors: ["#FFFF00", "#9ACD32", "#008000", "#008080", "#0000FF", "#4B0082", "#8A2BE2", "#FF00FF", "#FF0000", "#FF4500", "#FFA500", "#FFD700"],
  lineColor: 'rgba(255,255,255, .2)',
  lineWidth: 2,
};

const ColorLayer5Top = {
	canvasId: 'canvas-color-wheel',
	outerRadius: 70,
	innerRadius: 20,
	sectorsQuantity: 12,
  fillColors: ["rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)", "rgba(255,255,255, .5)"],
  lineColor: 'rgba(255,255,255, .2)',
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