import CardShoping from "./CardShoping.component";
import Copy from "./Copy.component";
import Download from "./Download.component";
import Hd from "./Hd.component";
import { IconProps } from "./Icon.interface";

const Icon = ({ icon, size = 2 }: IconProps) => {
  switch (icon) {
    case "card-shoping":
      return <CardShoping size={size} />;
    case "copy":
      return <Copy size={size} />;
    case "download":
      return <Download size={size} />;
    case "hd":
      return <Hd size={size} />;

    default:
      return <Download size={size} />;
  }
};

export default Icon;
