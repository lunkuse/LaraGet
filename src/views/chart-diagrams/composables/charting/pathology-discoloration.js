import { ref } from 'vue';
import useUtilities from './utilities';

export default function usePathologyDiscoloration() {
  const isRedSelected = ref(false);

  const isGraySelected = ref(false);

  const isYellowSelected = ref(false);

  const colour = ref('rgba(255, 0, 0, 0.3)');

  const {
    paths,
    teeth,
    frontContext,
    topContext,
    backContext,
    leftLowerJaw,
    leftUpperJaw,
    rightLowerJaw,
    rightUpperJaw,
    clearAllCanvases } = useUtilities();

  function drawToothTopMarker(path, ctx, toothNumber) {
    ctx.save();
    ctx.fillStyle = colour.value;
    if (rightUpperJaw.includes(toothNumber)) ctx.setTransform(-1, 0, 0, 1, 250, 0);
    if (leftUpperJaw.includes(toothNumber)) ctx.setTransform(1, 0, 0, 1, 69, 0);
    if (rightLowerJaw.includes(toothNumber)) {
      ctx.setTransform(1, 0, 0, 1, 250, 0);
      ctx.scale(-1, 1);
    }
    if (leftLowerJaw.includes(toothNumber)) ctx.setTransform(1, 0, 0, 1, 69, 0);
    ctx.fill(path);
    ctx.restore();
  }

  function drawToothFrontMarker(path, ctx, toothNumber) {
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
    ctx.fillStyle = colour.value;
    ctx.fill(path);
    ctx.restore();
  }

  function controlColour(selecteColour) {
    switch (selecteColour) {
      case 'red':
        isRedSelected.value = true;
        isYellowSelected.value = false;
        isGraySelected.value = false;
        colour.value = 'rgba(255, 0, 0, 0.3)';
        break;
      case 'gray':
        isRedSelected.value = false;
        isYellowSelected.value = false;
        isGraySelected.value = true;
        colour.value = 'rgba(0, 0, 0, 0.3)';
        break;
      case 'yellow':
        isRedSelected.value = false;
        isYellowSelected.value = true;
        isGraySelected.value = false;
        colour.value = 'rgba(255, 255, 0, 0.3)';
        break;
      default:
        isRedSelected.value = false;
        isYellowSelected.value = false;
        isGraySelected.value = false;
        colour.value = 'rgba(255, 0, 0, 0.3)';
    }
  }

  function markDiscoloration(toothNumber, selecteColour) {
    clearAllCanvases();

    controlColour(selecteColour);

    teeth[toothNumber]['all']['front'].forEach((element) => {
      drawToothFrontMarker(new Path2D(paths[element]), frontContext, toothNumber, colour);
    });

    teeth[toothNumber]['all']['top'].forEach((element) => {
      drawToothTopMarker(new Path2D(paths[element]), topContext, toothNumber, colour);
    });

    teeth[toothNumber]['all']['back'].forEach((element) => {
      drawToothTopMarker(new Path2D(paths[element]), backContext, toothNumber, colour);
    });
  }
  return {
    markDiscoloration,
    isRedSelected,
    isGraySelected,
    isYellowSelected,
  };
}
