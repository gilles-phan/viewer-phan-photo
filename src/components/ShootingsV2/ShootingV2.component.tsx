import { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { DEFAULT_NB_ELEM_PER_PAGE } from "../Pagination/Pagination.utils";
import { FormatedPhotosProps } from "../Shooting/Shooting.interface";
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
  getFileName,
  IS_BUY_BUTTON_DISPLAYED,
  filterByName,
} from "../Shooting/Shooting.utils";
// import "../Shooting/Shooting.scss";
import { ShootingProps } from "../Shootings/Shootings.interface";
import Icon from "../../icons/Icon.component";
import { mockListFiles } from "../Shooting/Shooting.mock";
import { Typography, Col, Divider, Row, Card, Pagination } from "antd";
const { Title, Text } = Typography;
const { Meta } = Card;

const ShootingV2 = () => {
  const { uuid } = useParams();
  const [photos, setPhotos] = useState<FormatedPhotosProps[]>([]);
  const [folderName, setFolderName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filterStartTime, setFilterStartTime] = useState(0);
  const [filterEndTime, setFilterEndTime] = useState(0);
  const [idPhotoStart, setIdPhotoStart] = useState(0);
  const [idPhotoEnd, setIdPhotoEnd] = useState(DEFAULT_NB_ELEM_PER_PAGE);
  const [filter /*, setFilter*/] = useState("");

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState<Array<string>>([]); // current displayed images

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  //   const search = (e: React.FormEvent<HTMLInputElement>) => {
  //     const searchValue = e.currentTarget.value.toLowerCase();
  //     setFilter(searchValue);
  //   };

  //   const clearSearch = () => setFilter("");

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
            console.log(parsedData);

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
            const scriptPhp = `../images/${image_path}/list.php`;

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
      .sort(sortByTime)
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
    <>
      <Row>
        <Col span={20} offset={2}>
          <Row>
            <Col span={24}>
              <Title style={{ marginTop: 12 }}>{title}</Title>
            </Col>
            <Col span={24}>
              <Title level={2}>{description}</Title>
            </Col>
            <Col span={24}>
              <Title level={2}>
                <Text type="secondary">
                  {photos.length} photo{photos.length > 1 && "s"}, sur le
                  créneau {numberToTime(filterStartTime)} -{" "}
                  {numberToTime(filterEndTime)}
                </Text>
              </Title>
            </Col>
            <Col span={24}>
              <Divider />
            </Col>
          </Row>
          <Row gutter={8}>
            {photos
              .sort(sortByTime)
              .filter(filterByName(filter))
              .filter(filterByTime(filterStartTime, filterEndTime))
              .filter((_, id) => id >= idPhotoStart && id < idPhotoEnd)
              .map((photo, id) => (
                <Col key={id} xs={24} md={12} xl={6} xxl={4}>
                  <Card
                    hoverable
                    style={{ width: "100%", height: "98%", marginTop: 8 }}
                    onClick={() => openImageViewer(id)}
                    cover={
                      <img
                        alt={`Photo : ${photo.name}.jpg`}
                        src={getThumbnailPathFromSd(
                          `/images/${folderName}/${photo.name}.jpg`
                        )}
                      />
                    }
                  >
                    <Meta
                      title={photo.name.slice(5, -3)}
                      description={numberToTime(+photo.name.substring(0, 4))}
                      style={{ marginBottom: 12 }}
                    />
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
                  </Card>
                </Col>
              ))}
          </Row>
          <Row style={{ marginTop: 24 }}>
            <Col span={24}>
              <Pagination
                align="center"
                defaultCurrent={1}
                total={photos.length}
                onChange={(page, pageSize) => {
                  console.log(page, pageSize);
                  const start = (page - 1) * pageSize;
                  const end = pageSize - 1 + page * pageSize;
                  console.log(`from ${start} to ${end}`);

                  setIdPhotoStart(start);
                  setIdPhotoEnd(end);
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="shooting-wrapper">
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
          {/* <Pagination
            type="dropdown"
            total={
              photos
                .filter(filterByName(filter))
                .filter(filterByTime(filterStartTime, filterEndTime)).length
            }
            onPageChange={(start: number, end: number) => {
              setIdPhotoStart(start);
              setIdPhotoEnd(end);
            }}
          /> */}
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default ShootingV2;
