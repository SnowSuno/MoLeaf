import { icon } from "./utils";

export const Globe = icon(({ color, size, weight, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width={size}
    height={size}
    {...props}
  >
    <path
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width={weight}
      d="M20.5 9.035a9.004 9.004 0 0 0-17 0m17 0c.324.928.5 1.926.5 2.965a8.988 8.988 0 0 1-.5 2.966m0-5.931h-17m0 0A8.987 8.987 0 0 0 3 12a8.99 8.99 0 0 0 .5 2.966m0 0a9.004 9.004 0 0 0 17 0m-17 0h17"
    />
    <path
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 21c4.97-4.97 4.97-13.03 0-18-4.97 4.97-4.97 13.03 0 18z"
    />
  </svg>
));
