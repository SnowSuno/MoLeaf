import { icon } from "./utils";

export const Flag = icon(({ color, size, weight }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width={size}
    height={size}
  >
    <path fill={color} d="M19 5H5v9h14V5z" />
    <path
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width={weight}
      d="M5 20v-6m0-9h14v9H5m0-9v9m0-9V4"
    />
  </svg>
));
