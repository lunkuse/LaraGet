export default function useVektisMap() {
  const initializeVektisMap = (ctx, toothNumber) => {
    let upperMolarVektis = ['18', '17', '16', '26', '27', '28'];
    let lowerMolarVektis = ['48', '47', '46', '36', '37', '38'];
    let upperCanineVektis = ['13', '23'];
    let lowerCanineVektis = ['43', '33'];

    ctx.lineWidth = 3;
    ctx.beginPath();
    if (upperCanineVektis.includes(toothNumber)) {
      ctx.moveTo(50, 50);
      ctx.lineTo(240, 50);
      ctx.lineTo(150, 0);
      ctx.lineTo(50, 50);
    } else {
      ctx.moveTo(50, 50);
      ctx.lineTo(70, 10);
      ctx.lineTo(220, 10);
      ctx.lineTo(240, 50);
      ctx.lineTo(220, 90);
      ctx.lineTo(70, 90);
      ctx.lineTo(50, 50);
      ctx.lineTo(240, 50);
    }
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(190 + 50, 50);
    ctx.lineTo(190 + 50, 180);
    ctx.lineTo(170 + 50, 140);
    ctx.lineTo(170 + 50, 90);
    ctx.lineTo(190 + 50, 50);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeRect(70, 90, 100 + 50, 50);
    if (upperMolarVektis.includes(toothNumber)) ctx.strokeRect(70, 90, 70, 80);
    if (lowerMolarVektis.includes(toothNumber)) ctx.strokeRect(70, 140, 60, 30);
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (lowerCanineVektis.includes(toothNumber)) {
      ctx.moveTo(50, 180);
      ctx.lineTo(240, 180);
      ctx.lineTo(150, 230);
      ctx.lineTo(50, 180);
    } else {
      ctx.moveTo(220, 140);
      ctx.lineTo(240, 180);
      ctx.lineTo(220, 220);
      ctx.lineTo(70, 220);
      ctx.lineTo(50, 180);
      ctx.lineTo(70, 140);
      ctx.lineTo(220, 140);
      ctx.lineTo(240, 180);
      ctx.lineTo(50, 180);
    }
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 180);
    ctx.lineTo(70, 140);
    ctx.lineTo(70, 90);
    ctx.lineTo(50, 50);
    ctx.strokeStyle = 'black';
    ctx.stroke();
  };

  return {
    initializeVektisMap,
  };
}
