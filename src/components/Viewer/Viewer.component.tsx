import MultiRangeSlider from "multi-range-slider-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination.component";
import { DEFAULT_NB_ELEM_PER_PAGE } from "../Pagination/Pagination.utils";

interface PhotosProps {
  time: number;
  name: string;
}
interface KeyLabelProps {
  key: string;
  label: string;
  filename: string;
}
export const Viewer = () => {
  const { key } = useParams();
  const [photos, setPhotos] = useState<PhotosProps[]>([]);
  const [title, setTitle] = useState("");
  const [filterStartTime, setFilterStartTime] = useState(0);
  const [filterEndTime, setFilterEndTime] = useState(0);

  const [idPhotoStart, setIdPhotoStart] = useState(0);
  const [idPhotoEnd, setIdPhotoEnd] = useState(DEFAULT_NB_ELEM_PER_PAGE);

  const numberToTime = (n: number) =>
    `${Math.round(n / 100)}h${n % 100 < 10 ? "0" : ""}${n % 100}`;

  const parseData = (datas: Array<string>) =>
    datas.map((data) => ({ time: +data.substring(0, 4), name: data }));

  const sortAsc = (photo1: PhotosProps, photo2: PhotosProps) =>
    photo1.time - photo2.time;

  const sortDesc = (photo1: PhotosProps, photo2: PhotosProps) =>
    photo2.time - photo1.time;
  useEffect(() => {
    // call

    fetch("../data/mockKeyLabel.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const keyLabel = json.find((item: KeyLabelProps) => item.key === key);
        if (keyLabel) {
          setTitle(keyLabel.label);
          fetch(`../data/${keyLabel.filename}`, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
            .then((response) => response.json())
            .then((json) => {
              const parsedData = parseData(json);
              setPhotos(parsedData);
              setFilterStartTime(parsedData.sort(sortAsc)[0]?.time || 0);
              setFilterEndTime(parsedData.sort(sortDesc)[0]?.time || 0);
            });
        }
      });
  }, [key]);

  const filterByTime = (start: number, end: number) => (photo: PhotosProps) =>
    photo.time >= start && photo.time <= end;

  const sortByTime = (photo1: PhotosProps, photo2: PhotosProps) =>
    photo1.time - photo2.time;

  // const getNameWithoutPrefixTime = (photoName: string) =>
  //   photoName.substring(5);
  // const getFormatedTime = (photoName: string) =>
  //   `${photoName.substring(0, 2)}h${photoName.substring(2, 4)}`;

  return (
    <>
      <h1>{title}</h1>
      <p>
        Nombre de photo affichées{" "}
        {photos.filter(filterByTime(filterStartTime, filterEndTime)).length}{" "}
        (sur un total de {photos.length}), sur le créneau{" "}
        {numberToTime(filterStartTime)} - {numberToTime(filterEndTime)}
      </p>
      <div className="photos-wrapper">
        {photos
          .filter(filterByTime(filterStartTime, filterEndTime))
          .filter((_, id) => id >= idPhotoStart && id < idPhotoEnd)
          .sort(sortByTime)
          .map((photo, id) => (
            <div key={id}>
              <img className="photo" src={`/images/${photo.name}.jpg`} />
              {photo.name}
            </div>
          ))}
      </div>
      {/* <ul>
        {photos
          .filter(filterByTime(filterStartTime, filterEndTime))
          .filter((_, id) => id >= idPhotoStart && id < idPhotoEnd)
          .sort((photo1, photo2) => photo1.time - photo2.time)
          .map((photo, id) => (
            <li key={id}>
              {getFormatedTime(photo.name)} -{" "}
              {getNameWithoutPrefixTime(photo.name)}
            </li>
          ))}
      </ul> */}
      <MultiRangeSlider
        min={
          photos.sort((photo1, photo2) => photo1.time - photo2.time)[0]?.time
        }
        max={
          photos.sort((photo1, photo2) => photo2.time - photo1.time)[0]?.time
        }
        step={1}
        minValue={filterStartTime}
        maxValue={filterEndTime}
        onInput={(e) => {
          setFilterStartTime(e.minValue);
          setFilterEndTime(e.maxValue);
        }}
      />
      <Pagination
        total={
          photos.filter(filterByTime(filterStartTime, filterEndTime)).length
        }
        onPageChange={(start: number, end: number) => {
          setIdPhotoStart(start);
          setIdPhotoEnd(end);
        }}
      />
    </>
  );
};
