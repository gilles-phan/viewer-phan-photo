import { SvgIconProps } from "./Icon.interface";
import { getSize } from "./icon.utils";

const CardShoping = ({ size }: SvgIconProps) => (
  <svg
    width={getSize(size)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path d="M8 0H0V16H8 57.8l94.4 362 1.6 6H160 496h8V368h-8H166.2l-20.9-80H496L571 48l5-16H559.2 78.5L71.7 6 70.2 0H64 8zM82.7 48H554.2l-70 224H141.1L82.7 48zM176 432a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 80a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm256-48a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm80 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z" />
  </svg>
);

export default CardShoping;
