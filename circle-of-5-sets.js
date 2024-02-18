let RotateWords = true;
const CurveStillWords = true;

const majorChords = {
	canvasId: 'canvas-circle-of-five',
	outerRadius: 270,
	innerRadius: 190, // Adjusted to fit as the outermost circle
	sectorsQuantity: 0,
	circleRotation: -90, // Degrees
	titlesRotation: -90, // Degrees
	keys: ['C', 'G', 'D', 'A', 'E', 'B/C♭', 'F♯/G♭', 'C♯/D♭', 'A♭', 'E♭', 'B♭', 'F'],
	// innerTextRotation: [0,0,0,0,0,0,0,0,0,0,0,0],
	// innerTextRotation: 60,
	rotateWordsWithSectors: RotateWords,
	showBoundaryCircles: true,
	// fillColors: ['rgba(205, 133, 63, 0.4)','rgba(184, 134, 11, 0.4)','rgba(189, 183, 107, 0.4)','rgba(154, 205, 50, 0.4)','rgba(107, 142, 35, 0.4)','rgba(32, 178, 170, 0.4)','rgba(47, 79, 79, 0.4)','rgba(70, 120, 180, 0.4)','rgba(65, 105, 225, 0.4)','rgba(72, 61, 139, 0.4)','rgba(148, 0, 211, 0.4)','rgba(199, 21, 133, 0.4)']
	// fillColors: ['rgba(240,255,240, 1)','rgba(245,255,250, 1)','rgba(240,255,255, 1)','rgba(240,248,255, 1)','rgba(248,248,255, 1)','rgba(245,245,245, 1)','rgba(255,245,238, 1)','rgba(245,245,220, 1)','rgba(253,245,230, 1)','rgba(255,250,240, 1)','rgba(255,255,240, 1)','rgba(250,235,215, 1)'],
	// fillColors: ['#f0d681','#52b09e','#7cc4b4','#89b1d8','#879aaa','#b999a5','#bea8b0','#c16f65','#e49d73','#e58178','#e47743','#eec95b'],
	// fillColors: ['#fde439','#cddf7f','#b4cfb4','#9abdb0','#84c5dd','#98a8d4','#be9cc6','#e09ebe','#f3a5a7','#f0a47c','#f3ae5f','#f29077'],
	fillColors: ['#f5e85b','#c8d992','#a9d5be','#83c4ca','#75c0d7','#8584bd','#be83b1','#eb91b5','#ef999c','#f79c41','#f4c93c','#f5e85b'],
	textSize: '26px',
	textWeight: '700',
	// lineWidth: 1,
	// clearMode: true,
};

const minorChords = {
	canvasId: 'canvas-circle-of-five',
	outerRadius: 190,
	innerRadius: 120, // Adjusted to fit between the major and dominant seventh chords
	sectorsQuantity: 0, // if 0 it sectorsQuantity will be based on the number of keys[]
	circleRotation: -90, // Degrees
	titlesRotation: -90, // Degrees
	showBoundaryCircles: true,
	rotateWordsWithSectors: RotateWords,
	keys: ['Am', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m', 'E♭m', 'B♭m', 'Fm', 'Cm', 'Gm', 'Dm'],
	// fillColors: ['rgba(160, 82, 45, 0.3)','rgba(139, 69, 19, 0.3)','rgba(128, 128, 0, 0.3)','rgba(85, 107, 47, 0.3)','rgba(34, 139, 34, 0.3)','rgba(0, 100, 0, 0.3)','rgba(72, 61, 139, 0.3)','rgba(75, 0, 120, 0.3)','rgba(153, 50, 204, 0.3)','rgba(148, 0, 211, 0.3)','rgba(139, 0, 139, 0.3)','rgba(128, 0, 128, 0.3)']
	// fillColors: ['rgba(250,128,114, .6)', 'LightPink', 'rgba(255,127,80, .7)', 'Khaki', 'Plum', 'LightGreen', 'MediumAquamarine', 'PaleTurquoise', 'LightBlue', 'BlanchedAlmond', 'Honeydew', 'MistyRose']
	// fillColors: ['rgba(240,255,240, 1)','rgba(245,255,250, 1)','rgba(240,255,255, 1)','rgba(240,248,255, 1)','rgba(248,248,255, 1)','rgba(245,245,245, 1)','rgba(255,245,238, 1)','rgba(245,245,220, 1)','rgba(253,245,230, 1)','rgba(255,250,240, 1)','rgba(255,255,240, 1)','rgba(250,235,215, 1)'],
	// fillColors: ['#f0d681','#52b09e','#7cc4b4','#89b1d8','#879aaa','#b999a5','#bea8b0','#c16f65','#e49d73','#e58178','#e47743','#eec95b'],
	// fillColors: ['#fde439','#cddf7f','#b4cfb4','#9abdb0','#84c5dd','#98a8d4','#be9cc6','#e09ebe','#f3a5a7','#f0a47c','#f3ae5f','#f29077'],
  fillColors: ['#f5e85b','#c8d992','#a9d5be','#83c4ca','#75c0d7','#8584bd','#be83b1','#eb91b5','#ef999c','#f79c41','#f4c93c','#f5e85b'],
	textSize: '18px',
	textWeight: '700'
};

const diminishedChords = {
	canvasId: 'canvas-circle-of-five',
	outerRadius: 120,
	innerRadius: 50, // Adjusted to fit between the major and dominant seventh chords
	sectorsQuantity: 0, // if 0 it sectorsQuantity will be based on the number of keys[]
	circleRotation: -90, // Degrees
	titlesRotation: -90, // Degrees
	showBoundaryCircles: true,
	rotateWordsWithSectors: RotateWords,
	// circleInTheCenter: '#182951',
	circleInTheCenter: 'transparent',
	keys: ['B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'F', 'C', 'G', 'D', 'A', 'E'],
	lineColor: '#000', // Black lines
	// fillColors: ['#f0d681','#52b09e','#7cc4b4','#89b1d8','#879aaa','#b999a5','#bea8b0','#c16f65','#e49d73','#e58178','#e47743','#eec95b'],
	// fillColors: ['#fde439','#cddf7f','#b4cfb4','#9abdb0','#84c5dd','#98a8d4','#be9cc6','#e09ebe','#f3a5a7','#f0a47c','#f3ae5f','#f29077'],
  fillColors: ['#f5e85b','#c8d992','#a9d5be','#83c4ca','#75c0d7','#8584bd','#be83b1','#eb91b5','#ef999c','#f79c41','#f4c93c','#f5e85b'],
	// fillColors: [], // Alternating colors for sectors
	// textColor: 'white',
	// showTopSectorsArc: [true, true, true, true, true, true, true, true, true, true, true, true],
	// showLeftSectorsLine: [true, true, true, true, true, true, true, true, true, true, true, true],
	// showRightSectorsLine: [true, true, true, true, true, true, true, true, true, true, true, true],
	// showBottomSectorsArc: [true, true, true, true, true, true, true, true, true, true, true, true],
	// lineColor: 'rgba(25, 25, 25, 1)',
	// lineWidth: 5,
	textSize: '16px',
	textWeight: '700'
};

const majorRedFrameConfig = {
	canvasId: 'canvas-circle-of-five',
	outerRadius: 270,
	innerRadius: 190, // Adjusted to fit as the outermost circle
	sectorsQuantity: 12,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	rotateWordsWithSectors: CurveStillWords,
	keys: ['IV', 'I (Key)', 'V', '', '', '', '', '', '', '', '', ''],
	showSectors: [true, true, true, true, true, true, true, true, true, true, true, true],
	showTopSectorsArc: [true, true, true, true, false, false, false, false, false, false, false, false],
	showLeftSectorsLine: [true, false, false, false, false, false, false, false, false, false, false, false],
	showRightSectorsLine: [false, false, true, false, false, false, false, false, false, false, false, false],
	showBottomSectorsArc: [false, false, false, false, false, false, false, false, false, false, false, false],
  fillColors: ['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)','rgba(0, 0, 0, .25)','rgba(255, 255, 255, 0)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)'],
	lineColor: 'rgba(25, 25, 25, 1)',
	lineWidth: 5,
	textSize: '14px',
	textYShift: 28,
	// textWeight: '700'
};

const majorRedFrameConfigTopLine = {
	canvasId: 'canvas-circle-of-five',
	outerRadius: 215,
	innerRadius: 120, // Adjusted to fit as the outermost circle
	sectorsQuantity: 0,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	rotateWordsWithSectors: CurveStillWords,
	keys: ['', '', '', '', '', '', '', '', '', '', '', ''],
	showSectors: [true, true, true, true, true, true, true, true, true, true, true, true],
	showTopSectorsArc: [true, true, true, true, false, true, false, false, false, false, false, false],
	showLeftSectorsLine: [false, false, false, false, false, false, false, false, false, false, false, false],
	showRightSectorsLine: [false, false, false, false, false, false, false, false, false, false, false, false],
	showBottomSectorsArc: [false, false, false, false, false, false, false, false, false, false, false, false],
	lineColor: 'rgba(165, 25, 25, .3)',
	lineWidth: 1,
};

const manorRedFrameConfig = {
	canvasId: 'canvas-circle-of-five',
	outerRadius: 190,
	innerRadius: 120, // Adjusted to fit as the outermost circle
	sectorsQuantity: 0,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	rotateWordsWithSectors: CurveStillWords,
	keys: ['ii', 'iii', 'iv', '', '', '', '', '', '', '', '', ''],
	showSectors: [true, true, true, true, true, true, true, true, true, true, true, true],
	showTopSectorsArc: [false, false, false, false, false, false, false, false, false, false, false, false],
	showLeftSectorsLine: [true, false, false, false, false, false, false, false, false, false, false, false],
	showRightSectorsLine: [false, false, true, false, false, false, false, false, false, false, false, false],
	showBottomSectorsArc: [true, false, true, false, false, false, false, false, false, false, false, false],
  fillColors: ['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)'],
	lineColor: 'rgba(25, 25, 25, 1)',
	lineWidth: 5,
	textSize: '14px',
	textYShift: 23,
};

const manorRedFrameConfigTopLine = {
	canvasId: 'canvas-circle-of-five',
	outerRadius: 144,
	innerRadius: 120, // Adjusted to fit as the outermost circle
	sectorsQuantity: 0,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	rotateWordsWithSectors: CurveStillWords,
	keys: ['', '', '', '', '', '', '', '', '', '', '', ''],
	showSectors: [true, true, true, true, true, true, true, true, true, true, true, true],
	showTopSectorsArc: [true, true, true, false, false, false, false, false, false, false, false, false],
	showLeftSectorsLine: [false, false, false, false, false, false, false, false, false, false, false, false],
	showRightSectorsLine: [false, false, false, false, false, false, false, false, false, false, false, false],
	showBottomSectorsArc: [false, false, false, false, false, false, false, false, false, false, false, false],
	lineColor: 'rgba(165, 25, 25, .3)',
	lineWidth: 1,
};

const diminishedRedFrameConfig = {
	canvasId: 'canvas-circle-of-five',
	outerRadius: 120,
	innerRadius: 50, // Adjusted to fit as the outermost circle
	sectorsQuantity: 0,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	rotateWordsWithSectors: CurveStillWords,
	keys: ['', 'vii', '', '', '', '', '', '', '', '', '', ''],
	showSectors: [true, true, true, true, true, true, true, true, true, true, true, true],
	showTopSectorsArc: [false, false, false, false, false, false, false, false, false, false, false, false],
	showLeftSectorsLine: [false, true, false, false, false, false, false, false, false, false, false, false],
	showRightSectorsLine: [false, true, false, false, false, false, false, false, false, false, false, false],
	showBottomSectorsArc: [false, true, false, false, false, false, false, false, false, false, false, false],
  fillColors: ['rgba(0, 0, 0, .25)','rgba(255, 255, 255, 0)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)','rgba(0, 0, 0, .25)'],
	lineColor: 'rgba(25, 25, 25, 1)',
	lineWidth: 5,
	textSize: '14px',
	textYShift: 22,
};

const diminishedRedFrameConfigTopLine = {
	canvasId: 'canvas-circle-of-five',
	outerRadius: 74,
	innerRadius: 50, // Adjusted to fit as the outermost circle
	sectorsQuantity: 0,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	rotateWordsWithSectors: CurveStillWords,
	keys: ['', '', '', '', '', '', '', '', '', '', '', ''],
	showSectors: [false, true, false, true, true, true, true, true, true, true, true, true],
	showTopSectorsArc: [false, true, false, false, false, false, false, false, false, false, false, false],
	showLeftSectorsLine: [false, false, false, false, false, false, false, false, false, false, false, false],
	showRightSectorsLine: [false, false, false, false, false, false, false, false, false, false, false, false],
	showBottomSectorsArc: [false, false, false, false, false, false, false, false, false, false, false, false],
	lineColor: 'rgba(165, 25, 25, .3)',
	lineWidth: 1,
	textSize: '14px',
};

const secondaryDominantRedFrameConfig = {
	canvasId: 'canvas-circle-of-five',
	outerRadius: 270,
	innerRadius: 190, // Adjusted to fit as the outermost circle
	sectorsQuantity: 12,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	rotateWordsWithSectors: CurveStillWords,
	keys: ['', '', '', 'V of V', '', '', '', '', '', '', '', ''],
	showSectors: [false, false, false, true, false, false, false, false, false, false, false, false],
	showTopSectorsArc: [false, false, false, true, false, false, false, false, false, false, false, false],
	showLeftSectorsLine: [false, false, false, true, false, false, false, false, false, false, false, false],
	showRightSectorsLine: [false, false, false, true, false, false, false, false, false, false, false, false],
	showBottomSectorsArc: [false, false, false, true, false, false, false, false, false, false, false, false],
	fillColors: ['transparent','transparent','transparent','rgba(0, 0, 0, .15)','transparent','transparent','transparent','transparent','transparent','transparent','transparent','transparent'],
	lineColor: 'rgba(25, 25, 25, .6)',
	lineWidth: 5,
	textSize: '14px',
	textYShift: 27,
	// textXShift: 10,
};

const secondaryDominant2RedFrameConfig = {
	canvasId: 'canvas-circle-of-five',
	outerRadius: 270,
	innerRadius: 190, // Adjusted to fit as the outermost circle
	sectorsQuantity: 12,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	rotateWordsWithSectors: CurveStillWords,
	keys: ['', '', '', '', '', 'V of vi', '', '', '', '', '', ''],
	showSectors: [false, false, false, false, false, true, false, false, false, false, false, false],
	showTopSectorsArc: [false, false, false, false, false, true, false, false, false, false, false, false],
	showLeftSectorsLine: [false, false, false, false, false, true, false, false, false, false, false, false],
	showRightSectorsLine: [false, false, false, false, false, true, false, false, false, false, false, false],
	showBottomSectorsArc: [false, false, false, false, false, true, false, false, false, false, false, false],
	fillColors: ['transparent','transparent','transparent','transparent','transparent','rgba(0, 0, 0, .15)','transparent','transparent','transparent','transparent','transparent','transparent'],
	lineColor: 'rgba(25, 25, 25, .6)',
	lineWidth: 5,
	textSize: '14px',
	textYShift: 27,
	// textXShift: -5,
};