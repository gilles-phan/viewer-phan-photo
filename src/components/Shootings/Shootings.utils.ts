import { ShootingProps } from "./Shootings.interface";

export const sortByShootingDate = (s1: ShootingProps, s2: ShootingProps) =>
  new Date(s1.date).getTime() - new Date(s2.date).getTime();

export const getPathFromShooting = (shooting: ShootingProps) => {
  const folder = "images";
  const year = shooting.date.substr(0, 4);
  const { imagePath: fileName, date } = shooting;
  return [folder, year, date, fileName].join("/");
};

export const formatDate = (strDate: string) => {
  const res = new Date(strDate).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return res.charAt(0).toUpperCase() + res.slice(1);
};
