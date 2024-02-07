const majorChords = {
	canvasId: 'canvas',
	outerRadius: 270,
	innerRadius: 190, // Adjusted to fit as the outermost circle
	sectorsQuantity: 0,
	circleRotation: -90, // Degrees
	titlesRotation: -90, // Degrees
	keys: ['C', 'G', 'D', 'A', 'E', 'B/C♭', 'F♯/G♭', 'C♯/D♭', 'A♭', 'E♭', 'B♭', 'F'],
	showBoundaryCircles: true,
	// fillColors: ['rgba(205, 133, 63, 0.4)','rgba(184, 134, 11, 0.4)','rgba(189, 183, 107, 0.4)','rgba(154, 205, 50, 0.4)','rgba(107, 142, 35, 0.4)','rgba(32, 178, 170, 0.4)','rgba(47, 79, 79, 0.4)','rgba(70, 120, 180, 0.4)','rgba(65, 105, 225, 0.4)','rgba(72, 61, 139, 0.4)','rgba(148, 0, 211, 0.4)','rgba(199, 21, 133, 0.4)']
	// fillColors: ['rgba(240,255,240, 1)','rgba(245,255,250, 1)','rgba(240,255,255, 1)','rgba(240,248,255, 1)','rgba(248,248,255, 1)','rgba(245,245,245, 1)','rgba(255,245,238, 1)','rgba(245,245,220, 1)','rgba(253,245,230, 1)','rgba(255,250,240, 1)','rgba(255,255,240, 1)','rgba(250,235,215, 1)'],
	// fillColors: ['#f0d681','#52b09e','#7cc4b4','#89b1d8','#879aaa','#b999a5','#bea8b0','#c16f65','#e49d73','#e58178','#e47743','#eec95b'],
	fillColors: ['#fde439','#cddf7f','#b4cfb4','#9abdb0','#84c5dd','#98a8d4','#be9cc6','#e09ebe','#f3a5a7','#f0a47c','#f3ae5f','#f29077'],
	textSize: '26px',
	textWeight: '700'
};

const minorChords = {
	canvasId: 'canvas',
	outerRadius: 190,
	innerRadius: 120, // Adjusted to fit between the major and dominant seventh chords
	sectorsQuantity: 0, // if 0 it sectorsQuantity will be based on the number of keys[]
	circleRotation: -90, // Degrees
	titlesRotation: -90, // Degrees
	showBoundaryCircles: true,
	keys: ['Am', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m', 'E♭m', 'B♭m', 'Fm', 'Cm', 'Gm', 'Dm'],
	// fillColors: ['rgba(160, 82, 45, 0.3)','rgba(139, 69, 19, 0.3)','rgba(128, 128, 0, 0.3)','rgba(85, 107, 47, 0.3)','rgba(34, 139, 34, 0.3)','rgba(0, 100, 0, 0.3)','rgba(72, 61, 139, 0.3)','rgba(75, 0, 120, 0.3)','rgba(153, 50, 204, 0.3)','rgba(148, 0, 211, 0.3)','rgba(139, 0, 139, 0.3)','rgba(128, 0, 128, 0.3)']
	// fillColors: ['rgba(250,128,114, .6)', 'LightPink', 'rgba(255,127,80, .7)', 'Khaki', 'Plum', 'LightGreen', 'MediumAquamarine', 'PaleTurquoise', 'LightBlue', 'BlanchedAlmond', 'Honeydew', 'MistyRose']
	// fillColors: ['rgba(240,255,240, 1)','rgba(245,255,250, 1)','rgba(240,255,255, 1)','rgba(240,248,255, 1)','rgba(248,248,255, 1)','rgba(245,245,245, 1)','rgba(255,245,238, 1)','rgba(245,245,220, 1)','rgba(253,245,230, 1)','rgba(255,250,240, 1)','rgba(255,255,240, 1)','rgba(250,235,215, 1)'],
	// fillColors: ['#f0d681','#52b09e','#7cc4b4','#89b1d8','#879aaa','#b999a5','#bea8b0','#c16f65','#e49d73','#e58178','#e47743','#eec95b'],
	fillColors: ['#fde439','#cddf7f','#b4cfb4','#9abdb0','#84c5dd','#98a8d4','#be9cc6','#e09ebe','#f3a5a7','#f0a47c','#f3ae5f','#f29077'],
	textSize: '18px',
	textWeight: '700'
};

const diminishedChords = {
	canvasId: 'canvas',
	outerRadius: 120,
	innerRadius: 50, // Adjusted to fit between the major and dominant seventh chords
	sectorsQuantity: 0, // if 0 it sectorsQuantity will be based on the number of keys[]
	circleRotation: -90, // Degrees
	titlesRotation: -90, // Degrees
	showBoundaryCircles: true,
	circleInTheCenter: 'white',
	keys: ['B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'F', 'C', 'G', 'D', 'A', 'E'],
	lineColor: '#000', // Black lines
	// fillColors: ['#f0d681','#52b09e','#7cc4b4','#89b1d8','#879aaa','#b999a5','#bea8b0','#c16f65','#e49d73','#e58178','#e47743','#eec95b'],
	fillColors: ['#fde439','#cddf7f','#b4cfb4','#9abdb0','#84c5dd','#98a8d4','#be9cc6','#e09ebe','#f3a5a7','#f0a47c','#f3ae5f','#f29077'],
	// fillColors: [], // Alternating colors for sectors
	// textColor: 'white',
	// showTopSectorsArc: [true, true, true, true, true, true, true, true, true, true, true, true],
	// showLeftSectorsLine: [true, true, true, true, true, true, true, true, true, true, true, true],
	// showRightSectorsLine: [true, true, true, true, true, true, true, true, true, true, true, true],
	// showBottomSectorsArc: [true, true, true, true, true, true, true, true, true, true, true, true],
	// lineColor: '#ff0303',
	// lineWidth: 5,
	textSize: '16px',
	textWeight: '700'
};

const majorRedFrameConfig = {
	canvasId: 'canvas',
	outerRadius: 270,
	innerRadius: 190, // Adjusted to fit as the outermost circle
	sectorsQuantity: 12,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	keys: ['IV', 'I (Key)', 'V', '', '', '', '', '', '', '', '', 'IV'],
	showSectors: [true, true, true, false, false, false, false, false, false, false, false, false],
	showTopSectorsArc: [true, true, true, true, false, false, false, false, false, false, false, false],
	showLeftSectorsLine: [true, false, false, false, false, false, false, false, false, false, false, false],
	showRightSectorsLine: [false, false, true, false, false, false, false, false, false, false, false, false],
	showBottomSectorsArc: [false, false, false, false, false, false, false, false, false, false, false, false],
	lineColor: '#ff0303',
	lineWidth: 5,
	textSize: '14px',
	textYShift: 25,
	// textWeight: '700'
};

const manorRedFrameConfig = {
	canvasId: 'canvas',
	outerRadius: 190,
	innerRadius: 120, // Adjusted to fit as the outermost circle
	sectorsQuantity: 0,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	keys: ['ii', 'iii', 'iv', '', '', '', '', '', '', '', '', ''],
	showSectors: [true, true, true, false, false, false, false, false, false, false, false, false],
	showTopSectorsArc: [false, false, false, false, false, false, false, false, false, false, false, false],
	showLeftSectorsLine: [true, false, false, false, false, false, false, false, false, false, false, false],
	showRightSectorsLine: [false, false, true, false, false, false, false, false, false, false, false, false],
	showBottomSectorsArc: [true, false, true, false, false, false, false, false, false, false, false, false],
	lineColor: '#ff0303',
	lineWidth: 5,
	textSize: '14px',
	textYShift: 20,
};

const diminishedRedFrameConfig = {
	canvasId: 'canvas',
	outerRadius: 120,
	innerRadius: 50, // Adjusted to fit as the outermost circle
	sectorsQuantity: 0,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	keys: ['ii', 'iii', 'iv', '', '', '', '', '', '', '', '', ''],
	showSectors: [false, true, false, false, false, false, false, false, false, false, false, false],
	showTopSectorsArc: [false, false, false, false, false, false, false, false, false, false, false, false],
	showLeftSectorsLine: [false, true, false, false, false, false, false, false, false, false, false, false],
	showRightSectorsLine: [false, true, false, false, false, false, false, false, false, false, false, false],
	showBottomSectorsArc: [false, true, false, false, false, false, false, false, false, false, false, false],
	lineColor: '#ff0303',
	lineWidth: 5,
	textSize: '14px',
	textYShift: 20,
};

const secondaryDominantRedFrameConfig = {
	canvasId: 'canvas',
	outerRadius: 270,
	innerRadius: 190, // Adjusted to fit as the outermost circle
	sectorsQuantity: 12,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	keys: ['', '', '', 'V of V', '', '', '', '', '', '', '', ''],
	showSectors: [false, false, false, true, false, false, false, false, false, false, false, false],
	showTopSectorsArc: [false, false, false, true, false, false, false, false, false, false, false, false],
	showLeftSectorsLine: [false, false, false, true, false, false, false, false, false, false, false, false],
	showRightSectorsLine: [false, false, false, true, false, false, false, false, false, false, false, false],
	showBottomSectorsArc: [false, false, false, true, false, false, false, false, false, false, false, false],
	lineColor: 'rgba(255, 3, 3, .6)',
	lineWidth: 5,
	textSize: '14px',
	textYShift: 25,
	textXShift: 10,
};

const secondaryDominant2RedFrameConfig = {
	canvasId: 'canvas',
	outerRadius: 270,
	innerRadius: 190, // Adjusted to fit as the outermost circle
	sectorsQuantity: 12,
	circleRotation: -120, // Degrees
	titlesRotation: -120, // Degrees
	keys: ['', '', '', 'V of V', '', 'V/vi', '', '', '', '', '', ''],
	showSectors: [false, false, false, false, false, true, false, false, false, false, false, false],
	showTopSectorsArc: [false, false, false, false, false, true, false, false, false, false, false, false],
	showLeftSectorsLine: [false, false, false, false, false, true, false, false, false, false, false, false],
	showRightSectorsLine: [false, false, false, false, false, true, false, false, false, false, false, false],
	showBottomSectorsArc: [false, false, false, false, false, true, false, false, false, false, false, false],
	lineColor: 'rgba(255, 3, 3, .6)',
	lineWidth: 5,
	textSize: '14px',
	textYShift: 25,
	textXShift: -5,
};