import MultiRangeSlider from "multi-range-slider-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination.component";

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
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  const numberToTime = (n: number) => `${Math.round(n / 100)}h${n % 100}`;

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
              setMinValue(parsedData.sort(sortAsc)[0]?.time || 0);
              setMaxValue(parsedData.sort(sortDesc)[0]?.time || 0);
            });
        }
      });
  }, [key]);

  return (
    <>
      <h1>{title}</h1>
      <p>
        Nombre de photo affichées{" "}
        {
          photos
            .filter((photo) => photo.time >= minValue)
            .filter((photo) => photo.time <= maxValue).length
        }{" "}
        (sur un total de {photos.length}), sur le créneau{" "}
        {numberToTime(minValue)} - {numberToTime(maxValue)}
      </p>
      <ul>
        {photos
          .filter((photo) => photo.time >= minValue)
          .filter((photo) => photo.time <= maxValue)
          .filter((_, id) => id >= start && id < end)
          .sort((photo1, photo2) => photo1.time - photo2.time)
          .map((photo, id) => (
            <li key={id}>
              {photo.name.substring(0, 2)}h{photo.name.substring(2, 4)} -{" "}
              {photo.name.substring(5)}
            </li>
          ))}
      </ul>
      <MultiRangeSlider
        min={
          photos.sort((photo1, photo2) => photo1.time - photo2.time)[0]?.time
        }
        max={
          photos.sort((photo1, photo2) => photo2.time - photo1.time)[0]?.time
        }
        step={1}
        minValue={minValue}
        maxValue={maxValue}
        onInput={(e) => {
          setMinValue(e.minValue);
          setMaxValue(e.maxValue);
        }}
      />
      <Pagination
        total={
          photos
            .filter((photo) => photo.time >= minValue)
            .filter((photo) => photo.time <= maxValue).length
        }
        onPageChange={(start: number, end: number) => {
          setStart(start);
          setEnd(end);
        }}
      />
    </>
  );
};
