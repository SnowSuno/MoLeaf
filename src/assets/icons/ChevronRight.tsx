import { icon } from "./utils";

export const ChevronRight = icon(({ color, size, weight }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width={size}
    height={size}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={weight}
      d="m10 7 5 5-5 5"
    />
  </svg>
));
