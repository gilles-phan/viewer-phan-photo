import { FormatedPhotosProps } from "./Shooting.interface";

export const IS_SLIDER_DISPLAYED = false;
export const IS_BUY_BUTTON_DISPLAYED = false;

/**
 * The header to request json files.
 * To be moved into a generic utils file ?
 *
 * @returns
 * @deprecated
 */
export const getHeader = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});

export const numberToTime = (n: number) =>
  `${Math.floor(n / 100)}h${n % 100 < 10 ? "0" : ""}${n % 100}`;

export const isZip = (fileName: string) => fileName.endsWith(".zip");

export const formateDatas = (files: Array<string>) =>
  files
    .map((fileName) => ({
      time: +fileName.substring(0, 4),
      name: fileName,
      isHdExist: files.includes(fileName.replace("_SD", "_HD")),
    }))
    .filter(removeHD);

export const sortAsc = (
  photo1: FormatedPhotosProps,
  photo2: FormatedPhotosProps
) => photo1.time - photo2.time;

export const sortDesc = (
  photo1: FormatedPhotosProps,
  photo2: FormatedPhotosProps
) => photo2.time - photo1.time;

export const filterByJpg = (photo: FormatedPhotosProps) => !isZip(photo.name);

export const filterByTime =
  (start: number, end: number) => (photo: FormatedPhotosProps) =>
    isZip(photo.name) || (photo.time >= start && photo.time <= end);

export const filterByName = (text: string) => (photo: FormatedPhotosProps) =>
  photo.name.toLowerCase().includes(text);


/**
 *
 * @param fileNameSd
 * @returns
 * @deprecated
 */
export const getThumbnailPathFromSd = (fileNameSd: string) =>
  fileNameSd.replace("_SD", "_thumbnail");

const filterSdHdZip = (fileName: string) =>
  fileName.includes("_SD") || fileName.includes("_HD") || isZip(fileName);
const removeExtensionJpg = (fileName: string) => fileName.replace(".jpg", "");
const removeHD = (file: { time: number; name: string; isHdExist: boolean }) =>
  !file.name.includes("_HD");

export const getFileName = (listFiles: Array<string>) =>
  listFiles.filter(filterSdHdZip).map(removeExtensionJpg);
