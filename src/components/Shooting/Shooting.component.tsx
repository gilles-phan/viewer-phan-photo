import MultiRangeSlider from "multi-range-slider-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination.component";
import { DEFAULT_NB_ELEM_PER_PAGE } from "../Pagination/Pagination.utils";
import { FormatedPhotosProps, PhotosProps } from "./Shooting.interface";
import {
  getHeader,
  numberToTime,
  formateDatas,
  sortAsc,
  sortDesc,
  filterByTime,
  sortByTime,
} from "./Shooting.utils";

export const Shooting = () => {
  const { uuid } = useParams();
  const [photos, setPhotos] = useState<FormatedPhotosProps[]>([]);
  const [folderName, setFolderName] = useState("");
  const [title, setTitle] = useState("");
  const [filterStartTime, setFilterStartTime] = useState(0);
  const [filterEndTime, setFilterEndTime] = useState(0);
  const [idPhotoStart, setIdPhotoStart] = useState(0);
  const [idPhotoEnd, setIdPhotoEnd] = useState(DEFAULT_NB_ELEM_PER_PAGE);

  useEffect(() => {
    // call

    if (uuid) {
      fetch(`../data/${uuid}.json`, { headers: getHeader() })
        .then((response) => response.json())
        .then((datas: PhotosProps) => {
          const parsedData = formateDatas(datas.data);
          setTitle(datas.name);
          setFolderName(datas.folderName);
          setPhotos(parsedData);
          setFilterStartTime(parsedData.sort(sortAsc)[0]?.time || 0);
          setFilterEndTime(parsedData.sort(sortDesc)[0]?.time || 0);
        });
    }
  }, [uuid]);

  return (
    <>
      <h1>{title}</h1>
      <p>
        Nombre de photo affichées{" "}
        {photos.filter(filterByTime(filterStartTime, filterEndTime)).length}{" "}
        (sur un total de {photos.length}), sur le créneau{" "}
        {numberToTime(filterStartTime)} - {numberToTime(filterEndTime)}
      </p>

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
      <hr />
      <div className="photos-wrapper">
        {photos
          .sort(sortByTime)
          .filter(filterByTime(filterStartTime, filterEndTime))
          .filter((_, id) => id >= idPhotoStart && id < idPhotoEnd)
          .map((photo, id) => (
            <div key={id}>
              <img
                className="photo"
                src={`/images/${folderName}/${photo.name}.jpg`}
              />
              {photo.name} ({numberToTime(+photo.name.substring(0, 4))})
            </div>
          ))}
      </div>
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