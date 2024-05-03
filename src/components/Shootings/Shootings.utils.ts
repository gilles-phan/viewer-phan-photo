import { ShootingProps } from "./Shootings.interface";

export const sortByShootingDate = (s1: ShootingProps, s2: ShootingProps) =>
  new Date(s1.date).getTime() - new Date(s2.date).getTime();

export const getPathFromShooting = (shooting: ShootingProps) => {
  const folder = "images";
  const year = shooting.date.substr(0, 4);
  const { imagePath: fileName, date } = shooting;
  return [folder, year, date,fileName].join("/");
};
