import { icon } from "./utils";

export const ArrowLeft = icon(({ color, size }) =>
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M7 12L16 6.80385V17.1962L7 12Z" fill={color}/>
  </svg>,
);
