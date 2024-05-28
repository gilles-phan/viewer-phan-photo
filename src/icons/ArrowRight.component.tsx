import { SvgIconProps } from "./Icon.interface";
import { getSize } from "./icon.utils";

const ArrowRight = ({ size }: SvgIconProps) => (
  <svg
    width={getSize(size)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M437.5 261.8l6-5.8-6-5.8-184-176-5.8-5.5L236.7 80.3l5.8 5.5L412.1 248 8 248l-8 0 0 16 8 0 404.1 0L242.5 426.2l-5.8 5.5 11.1 11.6 5.8-5.5 184-176z" />
  </svg>
);

export default ArrowRight;
