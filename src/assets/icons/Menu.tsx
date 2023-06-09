import { icon } from "./utils";

export const Menu = icon(({ color, size, weight, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    width={size} height={size} color={color} {...props}
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
          strokeWidth={weight} d="M6 8h12M6 12h12M6 16h12"/>
  </svg>
));
