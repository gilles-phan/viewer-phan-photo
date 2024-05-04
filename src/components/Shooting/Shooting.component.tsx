import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination.component";
import { DEFAULT_NB_ELEM_PER_PAGE } from "../Pagination/Pagination.utils";
import { FormatedPhotosProps, PhotosProps } from "./Shooting.interface";
import MultiRangeSlider from "multi-range-slider-react";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
import ImageViewer from "react-simple-image-viewer";
import toast, { Toaster } from "react-hot-toast";
import {
  getHeader,
  numberToTime,
  formateDatas,
  sortAsc,
  sortDesc,
  filterByTime,
  sortByTime,
  getThumbnailPathFromSd,
} from "./Shooting.utils";
import "./Shooting.scss";

export const Shooting = () => {
  const { uuid } = useParams();
  const [photos, setPhotos] = useState<FormatedPhotosProps[]>([]);
  const [folderName, setFolderName] = useState("");
  const [title, setTitle] = useState("");
  const [filterStartTime, setFilterStartTime] = useState(0);
  const [filterEndTime, setFilterEndTime] = useState(0);
  const [idPhotoStart, setIdPhotoStart] = useState(0);
  const [idPhotoEnd, setIdPhotoEnd] = useState(DEFAULT_NB_ELEM_PER_PAGE);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState<Array<string>>([]); // current displayed images

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast(`"${text}" copié !`, { icon: "👏", position: "top-right" });
  };

  useEffect(() => {
    // call

    if (uuid) {
      fetch(`../data/${uuid}.json`, { headers: getHeader() })
        .then((response) => response.json())
        .then((datas: PhotosProps) => {
          const parsedData = formateDatas(datas.data);
          setTitle(datas.title);
          setFolderName(datas.folderName);
          setPhotos(parsedData);
          setFilterStartTime(parsedData.sort(sortAsc)[0]?.time || 0);
          setFilterEndTime(parsedData.sort(sortDesc)[0]?.time || 0);
        });
    }
  }, [uuid]);

  useEffect(() => {
    const img: Array<string> = photos
      .sort(sortByTime)
      .filter(filterByTime(filterStartTime, filterEndTime))
      .filter((_, id) => id >= idPhotoStart && id < idPhotoEnd)
      .map(
        (photo: FormatedPhotosProps) =>
          `/images/${folderName}/${photo.name}.jpg`
      );

    setImages(img);
  }, [filterStartTime, filterEndTime, idPhotoStart, idPhotoEnd, photos]);
  return (
    <div className="shooting-wrapper">
      <h1>{title}</h1>
      <div className="filter">
        <p>
          Nombre de photo affichées{" "}
          {photos.filter(filterByTime(filterStartTime, filterEndTime)).length}{" "}
          (sur un total de {photos.length}), sur le créneau{" "}
          {numberToTime(filterStartTime)} - {numberToTime(filterEndTime)}
        </p>

        {/* <RangeSlider
        min={
          photos.sort((photo1, photo2) => photo1.time - photo2.time)[0]?.time
        }
        max={
          photos.sort((photo1, photo2) => photo2.time - photo1.time)[0]?.time
        }
      /> */}

        <div className="row">
          <div className="col">
            <MultiRangeSlider
              min={
                photos.sort((photo1, photo2) => photo1.time - photo2.time)[0]
                  ?.time
              }
              max={
                photos.sort((photo1, photo2) => photo2.time - photo1.time)[0]
                  ?.time
              }
              step={45}
              minValue={filterStartTime}
              maxValue={filterEndTime}
              onInput={(e) => {
                setFilterStartTime(e.minValue);
                setFilterEndTime(e.maxValue);
              }}
            />
          </div>
        </div>
      </div>
      <div className="text-center pagination-1">
        <Pagination
          total={
            photos.filter(filterByTime(filterStartTime, filterEndTime)).length
          }
          onPageChange={(start: number, end: number) => {
            setIdPhotoStart(start);
            setIdPhotoEnd(end);
          }}
        />
      </div>
      <div className="photos-wrapper">
        {photos
          .sort(sortByTime)
          .filter(filterByTime(filterStartTime, filterEndTime))
          .filter((_, id) => id >= idPhotoStart && id < idPhotoEnd)
          .map((photo, id) => (
            <div className="card" key={id}>
              <img
                src={getThumbnailPathFromSd(
                  `/images/${folderName}/${photo.name}.jpg`
                )}
                className="card-img-top mt-2"
                onClick={() => openImageViewer(id)}
              />
              <div className="card-body">
                <p className="card-text text-center">
                  Photo : {photo.name.slice(0, -3)} (
                  {numberToTime(+photo.name.substring(0, 4))})
                  <button
                    className="btn btn-success"
                    onClick={() => copyText(photo.name.slice(0, -3))}
                  >
                    copier le nom
                  </button>
                </p>
              </div>
            </div>
          ))}
      </div>

      {isViewerOpen && (
        <div className="image-viewer-wrapper">
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        </div>
      )}
      <div className="text-center pagination-2">
        <Pagination
          total={
            photos.filter(filterByTime(filterStartTime, filterEndTime)).length
          }
          onPageChange={(start: number, end: number) => {
            setIdPhotoStart(start);
            setIdPhotoEnd(end);
          }}
        />
      </div>
      <Toaster />
    </div>
  );
};
