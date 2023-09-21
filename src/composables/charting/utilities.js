import { inject, watch } from 'vue';
import paths from '@/assets/data/paths.json';
import teeth from '@/assets/data/teeth.json';

export default function useUtilities() {
  const activeTooth = inject('activeTooth');

  const treatmentBlob = inject('treatmentBlob');
  const treatmentBlobResetValue = inject('treatmentBlobResetValue');

  const restorationColors = {
    normal: 'rgba(176, 190, 212, 0.1)',
    gold: 'rgba(255, 215, 0, 0.7)',
    silver: 'rgba(192,192,192, 0.7)',
    toothColorA1: 'rgba(217, 205, 169, 0.7)',
    toothColorA2: 'rgba(218, 199, 150, 0.7)',
    toothColorA3: 'rgba(216, 191, 138, 0.7)',
    toothColorA35: 'rgba(215, 183, 118, 0.7)',
    toothColorA4: 'rgba(203, 169, 106, 0.7)',
    toothColorB1: 'rgba(213,207,189, 0.7)',
    toothColorB2: 'rgba(213,199,155, 0.7)',
    toothColorB3: 'rgba(215,191,126, 0.7)',
    toothColorB4: 'rgba(215,184,114, 0.7)',
    toothColorC1: 'rgba(206,191,154, 0.7)',
    toothColorC2: 'rgba(204,181,128, 0.7)',
    toothColorC3: 'rgba(198,179,129, 0.7)',
    toothColorC4: 'rgba(202,180,125, 0.7)',
    toothColorD2: 'rgba(206,176,124, 0.7)',
    toothColorD3: 'rgba(209,187,138, 0.7)',
    toothColorD4: 'rgba(204,183,123, 0.7)',
  };

  const upperCanineVektis = ['13', '23'];

  const lowerCanineVektis = ['43', '33']; 

  const leftUpperJaw = ['11', '12', '13', '14', '15', '16', '17', '18'];
  const rightUpperJaw = ['21', '22', '23', '24', '25', '26', '27', '28'];
  const leftLowerJaw = ['41', '42', '43', '44', '45', '46', '47', '48'];
  const rightLowerJaw = ['31', '32', '33', '34', '35', '36', '37', '38'];
  const incissorTeeth = ['11', '12', '13', '21', '22', '23', '31', '32', '33', '41', '42', '43'];

  const drawToothTopMarker = (path, ctx, toothNumber, color) => {
    ctx.save();
    ctx.fillStyle = color;
    if (rightUpperJaw.includes(toothNumber)) ctx.setTransform(-1, 0, 0, 1, 250, 0);
    if (leftUpperJaw.includes(toothNumber)) ctx.setTransform(1, 0, 0, 1, 69, 0);
    if (rightLowerJaw.includes(toothNumber)) {
      ctx.setTransform(1, 0, 0, 1, 250, 0);
      ctx.scale(-1, 1);
    }
    if (leftLowerJaw.includes(toothNumber)) ctx.setTransform(1, 0, 0, 1, 69, 0);
    ctx.fill(path);
    ctx.restore();
  };
  const drawToothFrontMarker = (path, ctx, toothNumber, color) => {
    ctx.save();
    if (rightUpperJaw.includes(toothNumber)) ctx.setTransform(-1, 0, 0, 1, 250, -15);
    if (leftUpperJaw.includes(toothNumber)) ctx.setTransform(1, 0, 0, 1, 69, -15);
    if (rightLowerJaw.includes(toothNumber)) {
      ctx.setTransform(1, 0, 0, 1, 250, 518);
      ctx.scale(-1, -1);
    }
    if (leftLowerJaw.includes(toothNumber)) {
      ctx.setTransform(1, 0, 0, 1, 69, 518);
      ctx.scale(1, -1);
    }
    ctx.fillStyle = color;
    ctx.fill(path);
    ctx.restore();
  };

  const paint = (backContext, topContext, frontContext, vektisMapContext, selectedAreas, color) => {
    let frontCanvasPaths = [];
    let topCanvasPaths = [];
    let backCanvasPaths = [];
    let newSelectedAreas = selectedAreas.concat();

    if (newSelectedAreas) {
      if ((selectedAreas.includes('mesio_buccal_cusp') || selectedAreas.includes('disto_buccal_cusp'))) {
        let indexOfBuccal = newSelectedAreas.indexOf('buccal');
        if (indexOfBuccal !== -1) newSelectedAreas.splice(indexOfBuccal, 1);
        selectedAreas = newSelectedAreas;
      }
      if ((selectedAreas.includes('mesio_palatal_cusp') || selectedAreas.includes('disto_palatal_cusp'))) {
        let indexOfPalatal = newSelectedAreas.indexOf('palatal');
        if (indexOfPalatal !== -1) newSelectedAreas.splice(indexOfPalatal, 1);
        selectedAreas = newSelectedAreas;
      }
    }
    for (let q = 0; q < selectedAreas.length; q += 1) {
      let frontArea = (teeth[activeTooth.value][selectedAreas[q]]) ? teeth[activeTooth.value][selectedAreas[q]]['front'] : [];
      let topArea = (teeth[activeTooth.value][selectedAreas[q]]) ? teeth[activeTooth.value][selectedAreas[q]]['top'] : [];
      let backArea = (teeth[activeTooth.value][selectedAreas[q]]) ? teeth[activeTooth.value][selectedAreas[q]]['back'] : [];
      let vektisArea = []; // teeth[16][selectedAreas[q]]['vektis'];

      if([16, 17, 18, 26, 27, 28].map(String).includes(activeTooth.value)) vektisArea = teeth[16][selectedAreas[q]]['vektis'];
      if([46, 47, 48, 36, 37, 38].map(String).includes(activeTooth.value)) vektisArea = teeth[46][selectedAreas[q]]['vektis'];
      if([13, 23, 33, 43].map(String).includes(activeTooth.value)) vektisArea = teeth[13][selectedAreas[q]]['vektis'];
      if ([15, 14, 12, 11, 25, 24, 22, 21, 35, 34, 32, 31, 45, 44, 42, 41].map(String).includes(activeTooth.value)) vektisArea = teeth[14][selectedAreas[q]]['vektis'];

      frontArea = (typeof frontArea === 'undefined') ? [] : frontArea;
      topArea = (typeof topArea === 'undefined') ? [] : topArea;
      backArea = (typeof backArea === 'undefined') ? [] : backArea;
      vektisArea = (typeof vektisArea === 'undefined') ? [] : vektisArea;

      for (let b = 0; b < frontArea.length; b += 1) {
        if (!frontCanvasPaths.includes(frontArea[b])) {
          drawToothFrontMarker(new Path2D(paths[frontArea[b]]), frontContext, activeTooth.value, color);
        }
        frontCanvasPaths.push(frontArea[b]);
      }
      for (let i = 0; i < topArea.length; i += 1) {
        if (!topCanvasPaths.includes(topArea[i])) {
          drawToothTopMarker(new Path2D(paths[topArea[i]]), topContext, activeTooth.value, color);
        }
        topCanvasPaths.push(topArea[i]);
      }
      for (let z = 0; z < backArea.length; z += 1) {
        if (!backCanvasPaths.includes(backArea[z])) {
          drawToothFrontMarker(new Path2D(paths[backArea[z]]), backContext, activeTooth.value, color);
        }
        backCanvasPaths.push(backArea[z]);
      }

      if (vektisArea.length > 0) {
        vektisMapContext.beginPath();
        vektisMapContext.moveTo(vektisArea[0][0], vektisArea[0][1]);
        for (let z = 1; z < vektisArea.length; z += 1) {
          vektisMapContext.lineTo(vektisArea[z][0], vektisArea[z][1]);
        }
        vektisMapContext.fillStyle = color;
        vektisMapContext.fill();
      }
    }
  };

  const markDecay = () => {
    // Pathology Layer
    const canvasContainer = document.getElementById('pathologyScreen');

    const backCanvas = canvasContainer.childNodes[3];
    const topCanvas = canvasContainer.childNodes[1];
    const frontCanvas = canvasContainer.childNodes[0];
    const vektisMapCanvas = canvasContainer.childNodes[2];

    if (leftUpperJaw.includes(activeTooth.value)) vektisMapCanvas.style.transform = 'scale(1, 1)';
    if (rightUpperJaw.includes(activeTooth.value)) vektisMapCanvas.style.transform = 'scaleX(-1)';
    if (leftLowerJaw.includes(activeTooth.value)) vektisMapCanvas.style.transform = 'scaleY(-1)';
    if (rightLowerJaw.includes(activeTooth.value)) vektisMapCanvas.style.transform = 'scale(-1, -1)';

    if (upperCanineVektis.includes(activeTooth.value)) vektisMapCanvas.style.transform = 'scale(1, -1)';
    if (lowerCanineVektis.includes(activeTooth.value)) vektisMapCanvas.style.transform = 'scale(-1, -1)';

    const backCtx = backCanvas.getContext('2d');
    const topCtx = topCanvas.getContext('2d');
    const frontCtx = frontCanvas.getContext('2d');
    const vektisCtx = vektisMapCanvas.getContext('2d');

    frontCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
    topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height);
    backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
    vektisCtx.clearRect(0, 0, vektisMapCanvas.width, vektisMapCanvas.height);

    const pathologyDiagnosis = treatmentBlob.value[activeTooth.value]['pathology'];
    const restorationTreatment = treatmentBlob.value[activeTooth.value]['restoration'];

    let tempPathologyAreas = [];
    let tempRestorationAreas = [];

    if (typeof restorationTreatment !== 'undefined') {
      let restorationArray = restorationTreatment['filling'];
      let type = restorationTreatment['type'];
      if (typeof restorationArray !== 'undefined') {
        tempRestorationAreas = restorationArray;
        paint(backCtx, topCtx, frontCtx, vektisCtx, tempRestorationAreas, restorationColors[type]);
      }
    }
    // if (typeof pathologyDiagnosis !== 'undefined') {
    //   let decayArray = pathologyDiagnosis['decay'];
    //   if (typeof decayArray !== 'undefined') {
    //     tempPathologyAreas = decayArray;
    //     paint(backCtx, topCtx, frontCtx, vektisCtx, tempPathologyAreas, 'rgba(255, 0, 0, 0.3)');
    //   }
    // }
    if (typeof pathologyDiagnosis !== 'undefined') {
      let decayArray = pathologyDiagnosis['decay'];
      if (typeof decayArray !== 'undefined') {
        tempPathologyAreas = decayArray;
        tempPathologyAreas.forEach((area) => {
          if (tempRestorationAreas.includes(area)) {
            let indexOfArea = tempPathologyAreas.indexOf(area);
            tempPathologyAreas.splice(indexOfArea, 1);
          }
        });
        paint(backCtx, topCtx, frontCtx, vektisCtx, tempPathologyAreas, 'rgba(255, 0, 0, 0.3)');
      }
    }
  };

  watch(treatmentBlob.value, () => markDecay());

  return {
    paths,
    teeth,
    leftLowerJaw,
    leftUpperJaw,
    rightLowerJaw,
    rightUpperJaw,
    incissorTeeth,
    markDecay,
    drawToothTopMarker,
    drawToothFrontMarker,
  };
}
