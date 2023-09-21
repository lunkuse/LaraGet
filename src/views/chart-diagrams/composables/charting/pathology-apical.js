/* eslint-disable no-mixed-spaces-and-tabs */
import { ref } from 'vue';

export default function useApicalPointPlot() {
  const isApicalPresent = ref(false);
  function apicalPointPlotting(frontContext, backContext) {
    isApicalPresent.value = true;
    frontContext.strokeStyle = 'red';
    backContext.strokeStyle = 'red';
    frontContext.beginPath();
    frontContext.arc(130, 65, 20, 40, 2 * Math.PI);
    frontContext.stroke();
    backContext.beginPath();
    backContext.arc(145, 65, 20, 40, 2 * Math.PI);
    backContext.stroke();
  }

  function apicalNotPresent(frontContext, backContext, frontCanvas, backCanvas) {
    frontContext.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
    backContext.clearRect(0, 0, backCanvas.width, backCanvas.height);
    isApicalPresent.value = false;
  }
  return {
    apicalPointPlotting,
    apicalNotPresent,
    isApicalPresent,
  };
}
