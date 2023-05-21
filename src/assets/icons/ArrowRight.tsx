import { icon } from "./utils";

export const ArrowRight = icon(({ color, size }) =>
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M17 12L8 17.1962V6.80385L17 12Z" fill={color}/>
  </svg>,
);
