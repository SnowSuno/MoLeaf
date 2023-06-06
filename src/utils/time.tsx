export const toDisplayTime = (time: number) => {
  const hour = Math.trunc(time / 60);
  const minute = time % 60;

  return <>
    {hour}<span>h</span>
    {!!minute && <>&nbsp;{minute}<span>m</span></>}
  </>;
};
