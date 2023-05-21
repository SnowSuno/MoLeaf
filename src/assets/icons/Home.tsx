import { icon } from "./utils";

export const Home = icon(({ color, size }) =>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" fill="none"
    width={size} height={size}
  >
    <path
      fill={color} fillRule="evenodd"
      d="M10.8 3.65a2 2 0 0 1 2.4 0l7 5.25-.6.8.6-.8a2 2 0 0 1 .8 1.6V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8.5a2 2 0 0 1 .8-1.6l7-5.25zM13 10a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6zm-4 3a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0v-3zm8 2a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1z"
      clipRule="evenodd"/>
  </svg>,
);
