import { SvgIconProps } from "./Icon.interface";
import { getSize } from "./icon.utils";

const Copy = ({ size }: SvgIconProps) => (
  <svg
    width={getSize(size)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M432 368H176V16H345.4L432 102.6V368zM448 96L352 0H176 160V16 368v16h16H432h16V368 96zM16 128H0v16V496v16H16 272h16V496 416H272v80H16V144H128V128H16z" />
  </svg>
);

export default Copy;
