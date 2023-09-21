import { inject, computed, ref } from 'vue';
import { useStore } from 'vuex';
import paths from '../../assets/data/paths.json';
import teeth from '../../assets/data/teeth.json';
import useVektisMap from './vektis-map';

export default function useMarkers() {
  const store = useStore();
  const { initializeVektisMap } = useVektisMap();
  const activeTreatment = computed(() => store.state.treatments.activeTreatment);
  const treatmentBlob = (Object.keys(activeTreatment.value).length !== 0) ? ref(JSON.parse(activeTreatment.value.tooth_sections)) : inject("treatmentBlob");

  const leftUpperJaw = ['11', '12', '13', '14', '15', '16', '17', '18'];
  const rightUpperJaw = ['21', '22', '23', '24', '25', '26', '27', '28'];
  const leftLowerJaw = ['41', '42', '43', '44', '45', '46', '47', '48'];
  const rightLowerJaw = ['31', '32', '33', '34', '35', '36', '37', '38'];

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
    blue: 'rgb(65,105,225)',
    orange: 'rgb(250, 85, 50)'
  };

  // const drawToothFrontMarker = (path, ctx, color) => {
  //   ctx.globaltoothColorOperation = 'destination-over';
  //   ctx.fillStyle = color;
  //   ctx.fill(path);
  // };
  const drawToothFrontMarker = (path, ctx, toothNumber, color) => {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.save();
    if (rightUpperJaw.includes(toothNumber)) ctx.setTransform(1, 0, 0, 1, 60, 0);
    if (leftUpperJaw.includes(toothNumber)) ctx.setTransform(1, 0, 0, 1, 60, 0);
    if (rightLowerJaw.includes(toothNumber)) {
      ctx.setTransform(1, 0, 0, 1, 60, 530);
      ctx.scale(1, -1);
    }
    if (leftLowerJaw.includes(toothNumber)) {
      ctx.setTransform(1, 0, 0, 1, 60, 530);
      ctx.scale(1, -1);
    }
    ctx.fillStyle = color;
    ctx.fill(path);
    ctx.restore();
  };

  const paint = (frontContext, vektisMapContext, backContext, selectedAreas, color, toothNumber) => {
    let frontCanvasPaths = [];
    // let topCanvasPaths = [];
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
      let frontArea = (teeth[toothNumber][selectedAreas[q]]) ? teeth[toothNumber][selectedAreas[q]]['front'] : [];
      // let topArea = teeth[toothNumber][selectedAreas[q]]['top'];
      let backArea = (teeth[toothNumber][selectedAreas[q]]) ? teeth[toothNumber][selectedAreas[q]]['back'] : [];
      let vektisArea = []; // teeth[16][selectedAreas[q]]['vektis'];

      if ([16, 17, 18, 26, 27, 28].map(String).includes(toothNumber)) vektisArea = teeth[16][selectedAreas[q]]['vektis'];
      if ([46, 47, 48, 36, 37, 38].map(String).includes(toothNumber)) vektisArea = teeth[46][selectedAreas[q]]['vektis'];
      if ([13, 23].map(String).includes(toothNumber)) vektisArea = teeth[13][selectedAreas[q]]['vektis'];
      if ([15, 14, 12, 11, 25, 24, 22, 21, 35, 34, 32, 31, 45, 44, 42, 41].map(String).includes(toothNumber)) vektisArea = teeth[14][selectedAreas[q]]['vektis'];

      frontArea = (typeof frontArea === 'undefined') ? [] : frontArea;
      // topArea = (typeof topArea === 'undefined') ? [] : topArea;
      backArea = (typeof backArea === 'undefined') ? [] : backArea;
      vektisArea = (typeof vektisArea === 'undefined') ? [] : vektisArea;

      for (let b = 0; b < frontArea.length; b += 1) {
        if (!frontCanvasPaths.includes(frontArea[b])) {
          drawToothFrontMarker(new Path2D(paths[frontArea[b]]), frontContext, toothNumber, color);
        }
        frontCanvasPaths.push(frontArea[b]);
      }
      for (let b = 0; b < backArea.length; b += 1) {
        if (!backCanvasPaths.includes(backArea[b])) {
          drawToothFrontMarker(new Path2D(paths[backArea[b]]), backContext, toothNumber, color);
        }
        backCanvasPaths.push(backArea[b]);
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
  const markFullChart = (toothNumber, checkPaint = true) => {
    const frontCanvasContainer = document.getElementById(`canvasContainerFront-${toothNumber}`);
    const vektisCanvasContainer = document.getElementById(`canvasContainerVektis-${toothNumber}`);
    const backCanvasContainer = document.getElementById(`canvasContainerBack-${toothNumber}`);

    const backCanvas = backCanvasContainer?.childNodes[0];
    // const topCanvas = canvasContainer.childNodes[1];
    const frontCanvas = frontCanvasContainer?.childNodes[0];
    const vektisMapCanvas = vektisCanvasContainer?.childNodes[0];

    if (
      typeof backCanvas !== "undefined" &&
      typeof frontCanvas !== "undefined" &&
      typeof vektisMapCanvas !== "undefined"
    ) {
      const backContext = backCanvas.getContext('2d');
      // const topContext = topCanvas.getContext('2d');
      const frontContext = frontCanvas.getContext('2d');
      const vektisMapContext = vektisMapCanvas.getContext('2d');

      frontContext.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
      // topContext.clearRect(0, 0, topCanvas.width, topCanvas.height);
      backContext.clearRect(0, 0, backCanvas.width, backCanvas.height);
      vektisMapContext.clearRect(0, 0, vektisMapCanvas.width, vektisMapCanvas.height);

      const pathologyDiagnosis = treatmentBlob.value[toothNumber]['pathology'];
      const restorationTreatment = treatmentBlob.value[toothNumber]['restoration'];
      const treatmentComplete = treatmentBlob.value[toothNumber]['treatmentComplete'];


      if(treatmentBlob.value.bridges && checkPaint ){
        let bridges = treatmentBlob.value.bridges;
        let bridgeTooth = bridges.find(b => b.teeth === +toothNumber);
        if(bridgeTooth){
          frontContext.fillStyle = "#666"
          backContext.fillStyle = "#666"

          if(bridgeTooth.bridge === 'full'){
            frontContext.fillRect(0,250, 400, 50)
            backContext.fillRect(0,250, 400, 50)
          }else{
            if(bridgeTooth.teeth > 20 && bridgeTooth.teeth < 29){
              if(bridgeTooth.direction === 'left'){
                frontContext.fillRect(170,250, 160, 50)
              }else{
                frontContext.fillRect(0,250, 160, 50)
              }
            }else if(bridgeTooth.teeth > 10 && bridgeTooth.teeth < 19){
              if(bridgeTooth.direction === 'left'){
                frontContext.fillRect(0,250, 160, 50)
              }else{
                frontContext.fillRect(170,250, 160, 50)
              }
            }else if(bridgeTooth.teeth > 30 && bridgeTooth.teeth < 39){
              if(bridgeTooth.direction === 'left'){
                backContext.fillRect(0,250, 160, 50)
              }else{
                backContext.fillRect(170,250, 160, 50)
              }
            }else if(bridgeTooth.teeth > 40 && bridgeTooth.teeth < 49){
              if(bridgeTooth.direction === 'left'){
                backContext.fillRect(170,250, 160, 50)
              }else{
                backContext.fillRect(0,250, 160, 50)
              }
            }
          }



          let exists = treatmentBlob.value.missing.filter(v => bridgeTooth.teeth === +v)

          if(exists.length !== 0){
            frontContext.fillRect(0,250, 400, 50)
            backContext.fillRect(0,250, 400, 50)
          }
        }
      }


      let tempPathologyAreas = [];
      let tempRestorationAreas = [];

      if (typeof restorationTreatment !== 'undefined') {
        let restorationArray = restorationTreatment['filling'];
        let type = restorationTreatment['type'];
        if (typeof restorationArray !== 'undefined' && !treatmentBlob.value.missing.includes(toothNumber.toString())) {
          tempRestorationAreas = restorationArray;
          if(checkPaint){
            if(treatmentComplete === 2){
              paint(frontContext, vektisMapContext, backContext, tempRestorationAreas, restorationColors.blue, toothNumber);
            }else if (treatmentComplete === 3){
              paint(frontContext, vektisMapContext, backContext, tempRestorationAreas, restorationColors.orange, toothNumber);
            }else{
              paint(frontContext, vektisMapContext, backContext, tempRestorationAreas, restorationColors[type], toothNumber);
            }

          }

        }
      }

      if (typeof pathologyDiagnosis !== 'undefined' && !treatmentBlob.value.missing.includes(toothNumber.toString())) {
        let decayArray = pathologyDiagnosis['decay'];
        if (typeof decayArray !== 'undefined') {
          tempPathologyAreas = decayArray;
          tempPathologyAreas.forEach((area) => {
            if (tempRestorationAreas.includes(area)) {
              let indexOfArea = tempPathologyAreas.indexOf(area);
              tempPathologyAreas.splice(indexOfArea, 1);
            }
          });
          if(checkPaint){
            if(treatmentComplete === 2){
              paint(frontContext, vektisMapContext, backContext, tempPathologyAreas, restorationColors.blue, toothNumber);
            }else if(treatmentComplete === 3){
              paint(frontContext, vektisMapContext, backContext, tempPathologyAreas, restorationColors.orange, toothNumber);
            }else{
              paint(frontContext, vektisMapContext, backContext, tempPathologyAreas, 'rgba(255, 0, 0, 0.3)', toothNumber);
            }

          }
        }
      }
      if (!treatmentBlob.value.missing.includes(toothNumber.toString())) initializeVektisMap(vektisMapContext, toothNumber);
    }
  };
  return {
    markFullChart,
  };
}
