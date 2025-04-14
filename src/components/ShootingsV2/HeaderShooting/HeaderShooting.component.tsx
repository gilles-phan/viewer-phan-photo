import HeaderChamplong from "./HeaderChamplong.component";
import HeaderEquitastree from "./HeaderEquitastree.component";
import HeaderLpeh from "./HeaderLpeh.component";

interface Props {
  title: string;
}
const HeaderShooting = ({ title }: Props) => {
  if (title.includes("LPEH 0")) return <HeaderLpeh />;
  if (title.includes("Champlong -")) return <HeaderChamplong />;
  if (title.includes("Équit Astrée #")) return <HeaderEquitastree />;
  return <></>;
};

export default HeaderShooting;
