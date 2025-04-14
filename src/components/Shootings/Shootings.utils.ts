import { ShootingProps } from "./Shootings.interface";

export const URL = "https://viewer.gils.xyz";
export const sortByShootingDate = (s1: ShootingProps, s2: ShootingProps) =>
  new Date(s1.date).getTime() - new Date(s2.date).getTime();
export const sortByLabel = (s1: ShootingProps, s2: ShootingProps) =>
  s2.label.localeCompare(s1.label);

export const getPathFromShooting = (shooting: ShootingProps) => {
  const folder = "images";
  const { image_path, thumbnail } = shooting;
  return [URL, folder, image_path, thumbnail].join("/") + `?${Date.now()}`;
};

export const getZip = () => [URL, "images", "zip.jpg"].join("/");

export const getThumbnailPath = (folderName: string, photoName: string) =>
  [
    URL,
    "images",
    folderName,
    `${photoName.replace("_SD", "_thumbnail")}.jpg`,
  ].join("/") + `?${Date.now()}`;

export const getPathListPhp = (image_path: string) =>
  [URL, "images", image_path, ("list.php?t=" + Date.now())].join("/");

export const formatDate = (strDate: string) => {
  const res = new Date(strDate).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return res.charAt(0).toUpperCase() + res.slice(1);
};
