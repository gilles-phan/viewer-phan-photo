import { FormatedPhotosProps } from "./Shooting.interface";


export const IS_SLIDER_DISPLAYED = false;

/**
 * The header to request json files.
 * To be moved into a generic utils file ?
 *
 * @returns
 */
export const getHeader = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});

export const numberToTime = (n: number) =>
  `${Math.floor(n / 100)}h${n % 100 < 10 ? "0" : ""}${n % 100}`;

export const formateDatas = (files: Array<string>) =>
  files.map((fileName) => ({
    time: +fileName.substring(0, 4),
    name: fileName,
  }));

export const sortAsc = (
  photo1: FormatedPhotosProps,
  photo2: FormatedPhotosProps
) => photo1.time - photo2.time;

export const sortDesc = (
  photo1: FormatedPhotosProps,
  photo2: FormatedPhotosProps
) => photo2.time - photo1.time;

export const filterByTime =
  (start: number, end: number) => (photo: FormatedPhotosProps) =>
    photo.time >= start && photo.time <= end;

export const sortByTime = (
  photo1: FormatedPhotosProps,
  photo2: FormatedPhotosProps
) => photo1.time - photo2.time;

export const getThumbnailPathFromSd = (fileNameSd: string) =>
  fileNameSd.replace("_SD", "_thumbnail");

const filterSd = (fileName: string) => fileName.includes("_SD");
const removeExtensionJpg = (fileName: string) => fileName.replace(".jpg", "");

export const getSdFileName = (listFiles: Array<string>) =>
  listFiles.filter(filterSd).map(removeExtensionJpg);

  