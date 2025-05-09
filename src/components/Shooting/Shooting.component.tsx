import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_NB_ELEM_PER_PAGE } from "../Pagination/Pagination.utils";
import { FormatedPhotosProps } from "./Shooting.interface";
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
  getThumbnailPathFromSd,
  getFileName,
  IS_SLIDER_DISPLAYED,
  IS_BUY_BUTTON_DISPLAYED,
  filterByName,
} from "./Shooting.utils";
import "./Shooting.scss";
import { ShootingProps } from "../Shootings/Shootings.interface";
import { Pagination } from "../Pagination/Pagination.component";
import Icon from "../../icons/Icon.component";
import { mockListFiles } from "./Shooting.mock";

export const Shooting = () => {
  const { uuid } = useParams();
  const [photos, setPhotos] = useState<FormatedPhotosProps[]>([]);
  const [folderName, setFolderName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filterStartTime, setFilterStartTime] = useState(0);
  const [filterEndTime, setFilterEndTime] = useState(0);
  const [idPhotoStart, setIdPhotoStart] = useState(0);
  const [idPhotoEnd, setIdPhotoEnd] = useState(DEFAULT_NB_ELEM_PER_PAGE);
  const [filter, setFilter] = useState("");

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState<Array<string>>([]); // current displayed images

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const search = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value.toLowerCase();
    setFilter(searchValue);
  };

  const clearSearch = () => setFilter("");

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Nom du fichier copié.", { icon: "👍", position: "top-right" });
  };

  /**
   * Add image to card.
   * TODO: should be moved into the store
   * @param text
   */
  const addToCard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("L'ajout au panier sera bientôt disponible...", {
      icon: "❌",
      position: "top-right",
    });
  };

  useEffect(() => {
    if (uuid) {
      if (!import.meta.env.PROD) {
        // dev mode
        fetch(
          "https://viewer.gils.xyz/backend/shooting/get-all.php" /*, { headers: getHeader() }*/
        )
          .then((response) => response.json())
          .then((datas) => {
            // TODO utiliser un getByUuid plutôt qu'un getAll
            console.log(datas);

            const { description, label, image_path } = datas.data.find(
              (shooting: ShootingProps) => shooting.uuid === uuid
            );

            const parsedData = formateDatas(getFileName(mockListFiles));
            setTitle(label);
            setDescription(description);
            setFolderName(`${image_path}`);
            setPhotos(parsedData);
            setFilterStartTime(parsedData.sort(sortAsc)[0]?.time || 0);
            setFilterEndTime(parsedData.sort(sortDesc)[0]?.time || 0);
          });
        // const { date, description, label } = mockDatas.find(
        //   (shooting: ShootingProps) => shooting.uuid === uuid
        // ) || { date: "2024-01-01", description: "mock", label: "mock" };
        // const year = date.substring(0, 4);
        // const parsedData = formateDatas(getSdFileName(mockListFiles));
        // setTitle(label);
        // setDescription(description);
        // setFolderName(`${year}/${date}`);
        // setPhotos(parsedData);
        // setFilterStartTime(parsedData.sort(sortAsc)[0]?.time || 0);
        // setFilterEndTime(parsedData.sort(sortDesc)[0]?.time || 0);
      } else {
        // production mode
        fetch(
          "https://viewer.gils.xyz/backend/shooting/get-all.php" /*, { headers: getHeader() }*/
        )
          .then((response) => response.json())
          .then((datas) => {
            // TODO utiliser un getByUuid plutôt qu'un getAll
            const { description, label, image_path } = datas.data.find(
              (shooting: ShootingProps) => shooting.uuid === uuid
            );
            const scriptPhp = `../images/${image_path}/list.php?t=${Date.now()}`;

            fetch(scriptPhp, { headers: getHeader() })
              .then((responseList) => responseList.json())
              .then((listFiles) => {
                const parsedData = formateDatas(getFileName(listFiles));
                setTitle(label);
                setDescription(description);
                setFolderName(`${image_path}`);
                setPhotos(parsedData);
                setFilterStartTime(parsedData.sort(sortAsc)[0]?.time || 0);
                setFilterEndTime(parsedData.sort(sortDesc)[0]?.time || 0);
              });
          });
      }
    }
  }, [uuid]);

  useEffect(() => {
    const img: Array<string> = photos
      .sort(sortAsc)
      .filter(filterByName(filter))
      .filter(filterByTime(filterStartTime, filterEndTime))
      .filter((_, id) => id >= idPhotoStart && id < idPhotoEnd)
      .map(
        (photo: FormatedPhotosProps) =>
          `/images/${folderName}/${photo.name}.jpg`
      );

    setImages(img);
  }, [
    filter,
    filterStartTime,
    filterEndTime,
    idPhotoStart,
    idPhotoEnd,
    photos,
    folderName,
  ]);
  return (
    <div className="shooting-wrapper">
      <h1 className="display-1">{title}</h1>
      <h2 className="display-6">{description}</h2>
      <div className="filter">
        <p className="text-body-secondary">
          {photos.length} photo{photos.length > 1 && "s"}, sur le créneau{" "}
          {numberToTime(filterStartTime)} - {numberToTime(filterEndTime)}
        </p>
        <p>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher par nom..."
              aria-label="Rechercher par nom..."
              value={filter}
              onChange={search}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={clearSearch}
            >
              X
            </button>
          </div>
        </p>

        {IS_SLIDER_DISPLAYED && (
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
        )}
      </div>
      <div className="photos-wrapper">
        {photos
          .sort(sortAsc)
          .filter(filterByName(filter))
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
                <p className="card-time">
                  {numberToTime(+photo.name.substring(0, 4))}
                </p>
                <p className="card-text text-center mt-3">
                  {photo.name.slice(5, -3)}
                </p>
                <p className="text-center">
                  {IS_BUY_BUTTON_DISPLAYED && (
                    <>
                      <button
                        className="btn btn-success bg-light"
                        onClick={() => addToCard(photo.name.slice(0, -3))}
                      >
                        <Icon icon="card-shoping" size={1} />
                      </button>{" "}
                    </>
                  )}
                  <button
                    className="btn btn-success bg-light"
                    onClick={() => copyText(photo.name.slice(0, -3))}
                  >
                    <Icon icon="copy" size={1} />
                  </button>{" "}
                  <a
                    href={`/images/${folderName}/${photo.name}.jpg`}
                    className="btn btn-success bg-light"
                    download
                  >
                    <Icon icon="download" size={1} />
                  </a>{" "}
                  {photo.isHdExist && (
                    // TODO remplacer les a par des link
                    <a
                      href={`/images/${folderName}/${photo.name.replace(
                        "_SD",
                        "_HD"
                      )}.jpg`}
                      className="btn btn-success bg-light"
                      download
                    >
                      <Icon icon="hd" size={1} />
                    </a>
                  )}
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
      <div className="text-center select-pagination">
        <Pagination
          type="dropdown"
          total={
            photos
              .filter(filterByName(filter))
              .filter(filterByTime(filterStartTime, filterEndTime)).length
          }
          onPageChange={(start: number, end: number) => {
            console.log(`PAGE CHANGE : ${start} to ${end}`);

            setIdPhotoStart(start);
            setIdPhotoEnd(end);
          }}
        />
      </div>
      <Toaster />
    </div>
  );
};
