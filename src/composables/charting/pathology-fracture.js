/* eslint-disable semi */
/* eslint-disable padded-blocks */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-const-assign */
import { ref } from 'vue';

export default function usePathologyFracture() {
  const crownFractureSelected = ref(false);
  const rootFractureSelected = ref(false);
  const horizontalRootFractureSelected = ref(false);
  const verticalRootFractureSelected = ref(false);
  const horizontalCrownFractureSelected = ref(false);
  const verticalCrownFractureSelected = ref(false);

  const drawHorizontalZigzagLine = (ctx, canvas) => {
    // properties of zigzag lines
    let x = 75; // offset by stroke width so the edges of of path are hidden
    let y = canvas.height - 125;
    let dx = 10;
    let xMax = canvas.width - 90;
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.moveTo(x, y - 5);

    while (x < xMax) {
      x += dx;
      ctx.lineTo(x, y + 5);
      x += dx;
      ctx.lineTo(x, y - 5);
    }
    ctx.stroke();
  };

  const drawVerticalZigzagLine = (ctx, canvas) => {
  // properties of zigzag lines
    let x = (canvas.width * 0.5) - 10; // offset by stroke width so the edges of of path are hidden
    let y = 55;
    let dy = 10;
    let yMax = canvas.height - 250;
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.moveTo(x - 5, y);

    while (y < yMax) {
      y += dy;
      ctx.lineTo(x + 5, y);
      y += dy;
      ctx.lineTo(x - 5, y);
    }
    ctx.stroke();
  };

  const drawSmallHorizontalZigzagLine = (ctx, canvas) => {
  // properties of zigzag lines
    let x = 100; // offset by stroke width so the edges of of path are hidden
    let y = 225;
    let dx = 10;
    let xMax = canvas.width - 140;
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.moveTo(x, y - 5);

    while (x < xMax) {
      x += dx;
      ctx.lineTo(x, y + 5);
      x += dx;
      ctx.lineTo(x, y - 5);
    }
    ctx.stroke();
  };

  function selectCrownFracture() {
    if (crownFractureSelected.value) {
      crownFractureSelected.value = false;
      rootFractureSelected.value = false;
      return true;
    }
    crownFractureSelected.value = true;
    rootFractureSelected.value = false;
    return true;
  }

  function selectRootFracture() {
    if (rootFractureSelected.value) {
      crownFractureSelected.value = false;
      rootFractureSelected.value = false;
      return true;
    }
    crownFractureSelected.value = false;
    rootFractureSelected.value = true;
    return true;
  }

  function selectVerticalCrownFracture() {
    if (verticalCrownFractureSelected.value) {
      verticalCrownFractureSelected.value = false;
      horizontalCrownFractureSelected.value = false;
      return true;
    }
    verticalCrownFractureSelected.value = true;
    horizontalCrownFractureSelected.value = false;
    return true;
  }

  function selectHorizontalCrownFracture() {
    if (horizontalCrownFractureSelected.value) {
      verticalCrownFractureSelected.value = false;
      horizontalCrownFractureSelected.value = false;
      return true;
    }
    verticalCrownFractureSelected.value = false;
    horizontalCrownFractureSelected.value = true;
    return true;
  }
  function selectVerticalRootFracture() {
    if (verticalRootFractureSelected.value) {
      verticalRootFractureSelected.value = false;
      horizontalRootFractureSelected.value = false;
      return true;
    }
    verticalRootFractureSelected.value = true;
    horizontalRootFractureSelected.value = false;
    return true;
  }

  function selectHorizontalRootFracture() {
    if (horizontalRootFractureSelected.value) {
      verticalRootFractureSelected.value = false;
      horizontalRootFractureSelected.value = false;
      return true;
    }
    verticalRootFractureSelected.value = false;
    horizontalRootFractureSelected.value = true;
    return true;
  }

  return {
    crownFractureSelected,
    rootFractureSelected,
    horizontalCrownFractureSelected,
    horizontalRootFractureSelected,
    verticalCrownFractureSelected,
    verticalRootFractureSelected,
    selectVerticalCrownFracture,
    selectVerticalRootFracture,
    selectCrownFracture,
    selectHorizontalCrownFracture,
    selectHorizontalRootFracture,
    drawSmallHorizontalZigzagLine,
    selectRootFracture,
    drawHorizontalZigzagLine,
    drawVerticalZigzagLine,
  };
}
