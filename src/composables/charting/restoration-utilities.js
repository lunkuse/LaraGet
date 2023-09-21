import paths from '@/assets/data/paths.json';
import teeth from '@/assets/data/teeth.json';

export default function useUtilities() {
  // Pathology Layer
  const canvasContainer = document.getElementById('restorationScreen');

  const backCanvas = canvasContainer.childNodes[3];
  const topCanvas = canvasContainer.childNodes[1];
  const frontCanvas = canvasContainer.childNodes[0];
  const vektisMapCanvas = canvasContainer.childNodes[2];

  const backContext = backCanvas.getContext('2d');
  const topContext = topCanvas.getContext('2d');
  const frontContext = frontCanvas.getContext('2d');
  const vektisMapContext = vektisMapCanvas.getContext('2d');

  const leftUpperJaw = ['11', '12', '13', '14', '15', '16', '17', '18'];
  const rightUpperJaw = ['21', '22', '23', '24', '25', '26', '27', '28'];
  const leftLowerJaw = ['41', '42', '43', '44', '45', '46', '47', '48'];
  const rightLowerJaw = ['31', '32', '33', '34', '35', '36', '37', '38'];
  const incissorTeeth = ['11', '12', '13', '21', '22', '23', '31', '32', '33', '41', '42', '43'];

  function clearFrontCanvas() {
    frontContext.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
  }
  function clearTopCanvas() {
    topContext.clearRect(0, 0, topCanvas.width, topCanvas.height);
  }
  function clearBackCanvas() {
    backContext.clearRect(0, 0, backCanvas.width, backCanvas.height);
  }
  function clearAllCanvases() {
    frontContext.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
    topContext.clearRect(0, 0, topCanvas.width, topCanvas.height);
    backContext.clearRect(0, 0, backCanvas.width, backCanvas.height);
  }

  return {
    paths,
    teeth,
    backCanvas,
    topCanvas,
    frontCanvas,
    backContext,
    topContext,
    frontContext,
    vektisMapContext,
    vektisMapCanvas,
    leftLowerJaw,
    leftUpperJaw,
    rightLowerJaw,
    rightUpperJaw,
    incissorTeeth,
    clearAllCanvases,
    clearBackCanvas,
    clearFrontCanvas,
    clearTopCanvas,
  };
}
