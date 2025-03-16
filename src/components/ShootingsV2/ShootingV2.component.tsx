import { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { DEFAULT_NB_ELEM_PER_PAGE } from "../Pagination/Pagination.utils";
import { FormatedPhotosProps } from "../Shooting/Shooting.interface";
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
  const [idPhotoEnd, setIdPhotoEnd] = useState(DEFAULT_NB_ELEM_PER_PAGE - 1);
  const [filter /*, setFilter*/] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(
    DEFAULT_NB_ELEM_PER_PAGE
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback(
    (index: number) => {
      setCurrentImageIndex(index + (currentPage - 1) * currentPageSize);
      setIsViewerOpen(true);
    },
    [currentPage, currentPageSize]
  );

  const closeImageViewer = () => {
    setCurrentImageIndex(0);
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
  const onPageChange = (page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    setIdPhotoStart(start);
    setIdPhotoEnd(end);
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
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
            {title.includes("Champlong -") && (
              <>
                <Col span={24}>
                  <Title level={2}>
                    <Text type="secondary">
                      Procédures pour commander des photos
                    </Text>
                  </Title>
                  <Title level={3}>
                    <Text type="secondary">
                      1️⃣ Notez les noms des photos que vous souhaitez commander
                    </Text>
                  </Title>
                  <Text style={{ marginLeft: 16 }}>
                    Exemple : D85_7856, Z91_4577, Z91_4577
                  </Text>
                  <Title level={3}>
                    <Text type="secondary">
                      2️⃣ Choisissez votre mode de paiement :
                    </Text>
                  </Title>
                  <strong style={{ marginLeft: 16 }}>
                    Option 1 - Paiement via PayPal
                  </strong>
                  <ul style={{ marginLeft: 24 }}>
                    <li>
                      Vérifiez les tarifs{" "}
                      <a target="_blank" href="https://phan.photo/princing">
                        ici
                      </a>
                    </li>
                    <li>
                      Effectuez votre paiement sur PayPal à l’adresse
                      phan.gilles@gmail.com
                    </li>
                    <li>
                      Envoyez-moi un email avec :
                      <ul>
                        <li>La date de votre commande</li>
                        <li>La liste des photos commandées</li>
                        <li>
                          (<em>Important</em>) Si votre compte PayPal utilise
                          une adresse différente, merci de me le préciser.
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <strong style={{ marginLeft: 16 }}>
                    Option 2 - Paiement via mon site
                  </strong>
                  <ul style={{ marginLeft: 24 }}>
                    <li>
                      Payez directement sur mon site dans la{" "}
                      <a target="_blank" href="https://phan.photo/princing">
                        section Tarifs
                      </a>
                    </li>
                    <li>
                      Sélectionnez le pack correspondant au nombre de photos
                      commandées
                    </li>
                    <li>
                      Envoyez-moi un email avec :
                      <ul>
                        <li>La date de votre commande</li>
                        <li>La liste des photos commandées</li>
                        <li>
                          (Si vous commandez un tirage papier) : indiquez-moi
                          l’adresse de livraison
                        </li>
                        <li>
                          (<em>Important</em>) Merci d’utiliser la même adresse
                          email que celle de votre commande. Si ce n’est pas le
                          cas, précisez-le dans votre message.
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <Title level={3}>
                    <Text type="secondary">📩 Une question ?</Text>
                  </Title>
                  <Text style={{ marginLeft: 16 }}>
                    Contactez-moi par{" "}
                    <a href="mailto:phan.gilles@gmail.com?subject=Question%20concernant%20les%20commandes%20photos">
                      email
                    </a>{" "}
                    ou par téléphone au{" "}
                    <a href="tel:+33682509580">06 82 50 95 80</a>
                  </Text>
                </Col>
              </>
            )}
            <Col span={24}>
              <Divider />
            </Col>
          </Row>
          <Row style={{ marginBottom: 24 }}>
            <Col span={24}>
              <Pagination
                align="center"
                total={photos.length}
                current={currentPage}
                pageSizeOptions={[12, 24, 60, 120]}
                pageSize={currentPageSize}
                onChange={onPageChange}
              />
            </Col>
          </Row>
          <Row gutter={8}>
            {photos
              .sort(sortByTime)
              .filter(filterByName(filter))
              .filter(filterByTime(filterStartTime, filterEndTime))
              .filter((_, id) => id >= idPhotoStart && id <= idPhotoEnd)
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
                      onClick={(e) => {
                        e.stopPropagation();
                        copyText(photo.name.slice(0, -3));
                      }}
                    >
                      <Icon icon="copy" size={1} />
                    </button>{" "}
                    <a
                      href={`/images/${folderName}/${photo.name}.jpg`}
                      className="btn btn-success bg-light"
                      onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
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
                current={currentPage}
                total={photos.length}
                pageSizeOptions={[12, 24, 60, 120]}
                pageSize={currentPageSize}
                onChange={onPageChange}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="shooting-wrapper">
        {isViewerOpen && (
          <div className="image-viewer-wrapper">
            <ImageViewer
              src={photos
                .sort(sortByTime)
                .filter(filterByName(filter))
                .filter(filterByTime(filterStartTime, filterEndTime))
                .map(
                  (photo: FormatedPhotosProps) =>
                    `/images/${folderName}/${photo.name}.jpg`
                )}
              currentIndex={currentImageIndex}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          </div>
        )}
        <Toaster />
      </div>
    </>
  );
};

export default ShootingV2;
