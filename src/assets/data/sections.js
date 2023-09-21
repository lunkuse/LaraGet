import paths from '@/assets/data/paths.json';
import teeth from '@/assets/data/teeth.json';

function markPathologySections(truthValue, activeTreatment) {
  let canvasContainer = document.getElementById('canvasContainer16');
  let backCanvas = canvasContainer.childNodes[6];
  let topCanvas = canvasContainer.childNodes[5];
  let frontCanvas = canvasContainer.childNodes[4];

  let backContext = backCanvas.getContext('2d');
  let topContext = topCanvas.getContext('2d');
  let frontContext = frontCanvas.getContext('2d');

  this[truthValue] = !this[truthValue];
  let selectedAreas = activeTreatment.tooth_sections.split(',');

  let indexOfBuccal = selectedAreas.indexOf('buccal');
  let indexOfPalatal = selectedAreas.indexOf('palatal');

  frontContext.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
  topContext.clearRect(0, 0, topCanvas.width, topCanvas.height + 150);
  backContext.clearRect(0, 0, backCanvas.width, backCanvas.height);

  this.frontCanvasPaths = [];
  this.topCanvasPaths = [];
  this.backCanvasPaths = [];

  if (this.isBuccalMarked) {
    if (this.isMesioBuccalCuspMarked && (indexOfBuccal !== -1)) {
      selectedAreas.splice(indexOfBuccal, 1);
    }
    if (this.isDistoBuccalCuspMarked && (indexOfBuccal !== -1)) {
      selectedAreas.splice(indexOfBuccal, 1);
    }
    if (indexOfBuccal === -1 && this.isDistoBuccalCuspMarked === false && this.isMesioBuccalCuspMarked === false) {
      selectedAreas.push('buccal');
    }
  }
  if (this.isPalatalMarked) {
    if (this.isMesioPalatalCuspMarked && (indexOfPalatal !== -1)) {
      selectedAreas.splice(indexOfPalatal, 1);
    }
    if (this.isDistoPalatalCuspMarked && (indexOfPalatal !== -1)) {
      selectedAreas.splice(indexOfPalatal, 1);
    }
    if (indexOfPalatal === -1 && this.isDistoPalatalCuspMarked === false && this.isMesioPalatalCuspMarked === false) {
      selectedAreas.push('palatal');
    }
  }
  for (let q = 0; q < selectedAreas.length; q += 1) {
    let frontArea = teeth['11'][selectedAreas[q]]['front'];
    let topArea = teeth['11'][selectedAreas[q]]['top'];
    let backArea = teeth['11'][selectedAreas[q]]['back'];

    frontArea = (typeof frontArea === 'undefined') ? [] : frontArea;
    topArea = (typeof topArea === 'undefined') ? [] : topArea;
    backArea = (typeof backArea === 'undefined') ? [] : backArea;

    if (frontArea.length > 0) {
      for (let b = 0; b < frontArea.length; b += 1) {
        if (!this.frontCanvasPaths.includes(frontArea[b])) {
          this.drawToothFrontMarker(new Path2D(paths[frontArea[b]]), frontContext);
        }
        this.frontCanvasPaths.push(frontArea[b]);
      }
    }
    if (topArea.length > 0) {
      for (let i = 0; i < topArea.length; i += 1) {
        if (!this.topCanvasPaths.includes(topArea[i])) {
          this.drawToothTopMarker(new Path2D(paths[topArea[i]]), topContext, topCanvas);
        }
        this.topCanvasPaths.push(topArea[i]);
      }
    }
    for (let z = 0; z < backArea.length; z += 1) {
      if (!this.backCanvasPaths.includes(backArea[z])) {
        this.drawBackOfToothMarker(new Path2D(paths[backArea[z]]), backContext, backCanvas);
      }
      this.backCanvasPaths.push(backArea[z]);
    }
  }
}

function drawToothTopMarker(path, ctx) {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
  ctx.setTransform(0.8, 0, 0, 0.8, 25, 0);
  ctx.fill(path);
  ctx.restore();
}
function drawToothFrontMarker(path, ctx) {
  ctx.save();
  ctx.setTransform(0.8, 0, 0, 0.8, 25, 55);
  ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
  ctx.fill(path);
  ctx.restore();
}
function drawBackOfToothMarker(path, ctx) {
  ctx.save();
  ctx.setTransform(0.8, 0, 0, 0.8, 25, 55);
  ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
  ctx.fill(path);
  ctx.restore();
}

export default {
  markPathologySections,
  drawBackOfToothMarker,
  drawToothFrontMarker,
  drawToothTopMarker,
  cervical_buccal:
  {
    id: 'cervical_buccal',
    name: 'Cervical Buccal',
    truthValue: 'isCervicalBuccalMarked',
  },
  buccal:
  {
    id: 'buccal',
    name: 'Buccal',
    truthValue: 'isBuccalMarked',
  },
  palatal:
  {
    id: 'palatal',
    name: 'Palatal',
    truthValue: 'isPalatalMarked',
  },
  mesial:
  {
    id: 'mesial',
    name: 'Mesial',
    truthValue: 'isMesialMarked',
  },
  occlusal:
  {
    id: 'occlusal',
    name: 'Occlusal',
    truthValue: 'isOcclusalMarked',
  },
  distal:
  {
    id: 'distal',
    name: 'Distal',
    truthValue: 'isDistalMarked',
  },
  cervical_palatal:
  {
    id: 'cervical_palatal',
    name: 'Cervical Palatal',
    truthValue: 'isCervicalPalatalMarked',
  },
  mesio_buccal_cusp:
  {
    id: 'mesio_buccal_cusp',
    name: 'Mesio Buccal Cusp',
    truthValue: 'isMesioBuccalCuspMarked',
  },
  disto_buccal_cusp:
  {
    id: 'disto_buccal_cusp',
    name: 'Distp Buccal Cusp',
    truthValue: 'isDistoBuccalCuspMarked',
  },
  mesio_palatal_cusp:
  {
    id: 'mesio_palatal_cusp',
    name: 'Mesio Palatal Cusp',
    truthValue: 'isMesioPalatalCuspMarked',
  },
  disto_palatal_cusp:
  {
    id: 'disto_palatal_cusp',
    name: 'Disto Palatal Cusp',
    truthValue: 'isDistoPalatalCuspMarked',
  },
  c1: {
    id: 'c1',
    name: 'C1',
    truthValue: 'isC1Clicked',
  },
  c2: {
    id: 'c2',
    name: 'C2',
    truthValue: 'isC2Clicked',
  },
  c3: {
    id: 'c3',
    name: 'C3',
    truthValue: 'isC3Clicked',
  },
  c4: {
    id: 'c4',
    name: 'C4',
    truthValue: 'isC4Clicked',
  },
  enamel: {
    id: 'enamel',
    name: 'Enamel',
    truthValue: 'isEnamelClicked',
  },
  dentin: {
    id: 'dentin',
    name: 'Dentin',
    truthValue: 'isDentinClicked',
  },
  caviation: {
    id: 'caviation',
    name: 'Caviation',
    truthValue: 'isCaviationClicked',
  },
  no_cavition: {
    id: 'no_cavition',
    name: 'No Caviation',
    truthValue: 'isNoCaviationClicked',
  },
  pulp_involved: {
    id: 'pulp_involved',
    name: 'Pulp Involved',
    truthValue: 'isPupInvolvedClicked',
  },
  pulp_not_involved: {
    id: 'pulp_not_involved',
    name: 'Pulp Not Involved',
    truthValue: 'isPulpNotInvolvedClicked',
  },
};
