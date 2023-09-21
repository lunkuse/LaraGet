import { ref } from 'vue';
import useUtilities from './utilities';
import stripesPath from '../../assets/stripes-pattern.png';

export default function usePathologyToothWear() {
  const isErosionPresent = ref(false);
  const isAbrasionPresent = ref(false);

  const isToothWearOnBuccal = ref(false);
  const isToothWearOnPalatal = ref(false);

  const stripes = new Image();
  stripes.src = stripesPath;

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
    let pattern = ctx.createPattern(stripes, 'repeat');
    ctx.fillStyle = pattern;
    if (isAbrasionPresent.value) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    }
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
    let pattern = ctx.createPattern(stripes, 'repeat');
    ctx.fillStyle = pattern;
    if (isAbrasionPresent.value) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    }
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
    ctx.fill(path);
    ctx.restore();
  }

  function abrasionSelected() {
    if (!isAbrasionPresent.value) {
      isAbrasionPresent.value = true;
      isErosionPresent.value = false;
      return true;
    }
    isAbrasionPresent.value = false;
    isErosionPresent.value = false;
    isToothWearOnBuccal.value = false;
    isToothWearOnPalatal.value = false;
    return true;
  }
  function erosionSelected() {
    if (!isErosionPresent.value) {
      isAbrasionPresent.value = false;
      isErosionPresent.value = true;
      return true;
    }
    isAbrasionPresent.value = false;
    isErosionPresent.value = false;
    isToothWearOnBuccal.value = false;
    isToothWearOnPalatal.value = false;
    return true;
  }

  function toothWearOnBuccal() {
    if (!isToothWearOnBuccal.value) {
      isToothWearOnBuccal.value = true;
      return true;
    }
    isToothWearOnBuccal.value = true;
    return true;
  }
  function toothWearOnPalatal() {
    if (!isToothWearOnPalatal.value) {
      isToothWearOnPalatal.value = true;
      return true;
    }
    isToothWearOnPalatal.value = true;
    return true;
  }

  function markToothErosion(toothNumber, area) {
    clearAllCanvases();

    teeth[toothNumber][area]['front'].forEach((element) => {
      drawToothFrontMarker(new Path2D(paths[element]), frontContext, toothNumber);
    });

    teeth[toothNumber][area]['top'].forEach((element) => {
      drawToothTopMarker(new Path2D(paths[element]), topContext, toothNumber);
    });

    teeth[toothNumber][area]['back'].forEach((element) => {
      drawToothTopMarker(new Path2D(paths[element]), backContext, toothNumber);
    });
  }
  function markToothAbrasion(toothNumber, area) {
    clearAllCanvases();

    teeth[toothNumber][area]['front'].forEach((element) => {
      drawToothFrontMarker(new Path2D(paths[element]), frontContext, toothNumber);
    });

    teeth[toothNumber][area]['top'].forEach((element) => {
      drawToothTopMarker(new Path2D(paths[element]), topContext, toothNumber);
    });

    teeth[toothNumber][area]['back'].forEach((element) => {
      drawToothTopMarker(new Path2D(paths[element]), backContext, toothNumber);
    });
  }

  return {
    isAbrasionPresent,
    isErosionPresent,
    isToothWearOnBuccal,
    isToothWearOnPalatal,
    erosionSelected,
    abrasionSelected,
    toothWearOnBuccal,
    toothWearOnPalatal,
    markToothAbrasion,
    markToothErosion,
  };
}
