export const gaugeSizes = (widget: boolean) => ({
  width: 400,
  height: widget ? 58 : 40,
  axisHeight: widget ? 0 : 15,
  radius: widget ? 20 : 14,
});

export const graphSizes = () => ({
  width: 400,
  height: 200,
  axisMargin: 8,
  axisHeight: 23,
  dateHeight: 50,
  boxPadding: 4,
});
