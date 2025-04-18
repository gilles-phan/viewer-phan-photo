import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_NB_ELEM_PER_PAGE } from "../Pagination/Pagination.utils";
import { FormatedPhotosProps } from "../Shooting/Shooting.interface";
import ImageViewer from "react-simple-image-viewer";
import toast, { Toaster } from "react-hot-toast";
import {
  numberToTime,
  formateDatas,
  sortAsc,
  sortDesc,
  filterByTime,
  getFileName,
  IS_BUY_BUTTON_DISPLAYED,
  filterByName,
  isZip,
  filterByJpg,
} from "../Shooting/Shooting.utils";
import { ShootingProps } from "../Shootings/Shootings.interface";
import Icon from "../../icons/Icon.component";
import { Typography, Col, Divider, Row, Card, Pagination } from "antd";
import {
  getThumbnailPath,
  getPathListPhp,
  getZip,
  URL,
} from "../Shootings/Shootings.utils";
import HeaderShooting from "./HeaderShooting/HeaderShooting.component";
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
      fetch(
        "https://viewer.gils.xyz/backend/shooting/get-all.php" /*, { headers: getHeader() }*/
      )
        .then((response) => response.json())
        .then((datas) => {
          // TODO utiliser un getByUuid plutôt qu'un getAll
          const { description, label, image_path } = datas.data.find(
            (shooting: ShootingProps) => shooting.uuid === uuid
          );
          const scriptListPhp = getPathListPhp(image_path);

          fetch(scriptListPhp /*, { headers: getHeader() }*/)
            .then((responseList) => responseList.json())
            .then((listFiles) => {
              const parsedData = formateDatas(getFileName(listFiles)).sort(
                sortDesc
              );
              setTitle(label);
              setDescription(description);
              setFolderName(`${image_path}`);
              setPhotos(parsedData);
              setFilterStartTime(
                parsedData.filter(filterByJpg).sort(sortAsc)[0]?.time || 0
              );
              setFilterEndTime(
                parsedData.filter(filterByJpg).sort(sortDesc)[0]?.time || 0
              );
            });
        });
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
            <HeaderShooting title={title} />
            {/* {title.includes("LPEH 0") && (
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
                      2️⃣ Régler les photos sur le Paypal des Poun's
                    </Text>
                  </Title>
                  <Text style={{ marginLeft: 16 }}>
                    Pensez à faire une capture d'écran du reçu.
                  </Text>
                  <Title level={3}>
                    <Text type="secondary">
                      3️⃣ Envoyer un mail à{" "}
                      <a href="mailto:phan.gilles@gmail.com?subject=Commande%20Photos%20Pouns">
                        phan.gilles@gmail.com
                      </a>
                    </Text>
                  </Title>
                  <Text style={{ marginLeft: 16 }}>
                    En y indiquant les photos que vous avez sélectionné ainsi
                    qu'une capture d'écran du règlement sur Paypal. Vous
                    recevrez les photos sous 24h.
                  </Text>

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
                      2️⃣ Payement, plusieurs options s'offrent à vous :
                    </Text>
                  </Title>
                  <strong style={{ marginLeft: 16 }}>
                    Option 1 - Paiement via mon site, réalisez le paiement via
                    l'un des pack ci-dessous, envoyez moi un mail à{" "}
                    <a href="mailto:phan.gilles@gmail.com?subject=Question%20concernant%20les%20commandes%20photos">
                      phan.gilles@gmail.com
                    </a>{" "}
                    avec votre email et les photos désirées. Vous recevrez vos
                    photos retravaillées sous quelques jours.
                  </strong>
                  <ul style={{ marginLeft: 24 }}>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/8wMaGIcrdbWA6je7ss"
                      >
                        Photo numérique (x1) - 10€
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/14kbKM0Iv7GkgXS145"
                      >
                        Photo numérique (x3) - 20€
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/3csaGIgHt5yc8rm4gi"
                      >
                        Photo numérique (x5) - 30€
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/aEU5mobn98Koazu4gm"
                      >
                        Photo numérique (passage complet) - 50€, +20€/passage
                        sup.
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/00g024gHte4IdLG6ov"
                      >
                        Tirage papier (x1) - 15€
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/eVa024aj53q4dLG4go"
                      >
                        Tirage papier (x3) - 30€
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/7sI4ikaj51hW7ni7sB"
                      >
                        Tirage papier (x5) - 45€
                      </a>
                    </li>
                  </ul>
                  <strong style={{ marginLeft: 16 }}>
                    Option 2 - Paiement en magasin
                  </strong>
                  <ul style={{ marginLeft: 24 }}>
                    <li>
                      Payez chez PADD - Roanne, en espèce, par CB sans contact
                      ou avec votre téléphone.
                    </li>
                    <li>Pensez à sélectionner vos photos en amont.</li>
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
            {title.includes("Équit Astrée #") && (
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
                  <strong style={{ marginLeft: 16 }}>
                    Exemple : D85_7856, Z91_4577, Z91_4577
                  </strong>
                  <Title level={3}>
                    <Text type="secondary">2️⃣ Commande :</Text>
                  </Title>
                  <strong style={{ marginLeft: 16 }}>
                    Réalisez le paiement via l'un des pack ci-dessous, puis
                    envoyez moi un mail à{" "}
                    <a href="mailto:phan.gilles@gmail.com?subject=Question%20concernant%20les%20commandes%20photos">
                      phan.gilles@gmail.com
                    </a>{" "}
                    avec votre email et les photos désirées. Vous recevrez vos
                    photos retravaillées sous quelques jours.
                  </strong>
                  <ul style={{ marginLeft: 24 }}>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/8wMaGIcrdbWA6je7ss"
                      >
                        Photo numérique (x1) - 10€
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/14kbKM0Iv7GkgXS145"
                      >
                        Photo numérique (x3) - 20€
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/3csaGIgHt5yc8rm4gi"
                      >
                        Photo numérique (x5) - 30€
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/aEU5mobn98Koazu4gm"
                      >
                        Photo numérique (passage complet) - 50€, +20€/passage
                        sup.
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/00g024gHte4IdLG6ov"
                      >
                        Tirage papier (x1) - 15€
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/eVa024aj53q4dLG4go"
                      >
                        Tirage papier (x3) - 30€
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://buy.stripe.com/7sI4ikaj51hW7ni7sB"
                      >
                        Tirage papier (x5) - 45€
                      </a>
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
            )} */}
            <Col span={24}>
              <Divider />
            </Col>
          </Row>
          <Row style={{ marginBottom: 24 }}>
            <Col span={24}>
              <Pagination
                showQuickJumper
                locale={{ jump_to: "Accéder à la page ", page: "" }}
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
              .sort(sortAsc)
              .filter(filterByName(filter))
              .filter(filterByTime(filterStartTime, filterEndTime))
              .filter((_, id) => id >= idPhotoStart && id <= idPhotoEnd)
              .map((photo, id) => (
                <Col key={id} xs={24} md={12} xl={6} xxl={4}>
                  {isZip(photo.name) ? (
                    <Card
                      hoverable
                      style={{ width: "100%", height: "98%", marginTop: 8 }}
                      cover={<img alt={photo.name} src={getZip()} />}
                    >
                      <Meta title={photo.name} style={{ marginBottom: 12 }} />
                      <a
                        href={`${URL}/images/${folderName}/${photo.name}`}
                        className="btn btn-success bg-light"
                        onClick={(e) => e.stopPropagation()}
                        download
                      >
                        <Icon icon="download" size={1} />
                      </a>
                    </Card>
                  ) : (
                    <Card
                      hoverable
                      style={{ width: "100%", height: "98%", marginTop: 8 }}
                      onClick={() => openImageViewer(id)}
                      cover={
                        <img
                          alt={`Photo : ${photo.name}.jpg`}
                          src={getThumbnailPath(folderName, photo.name)}
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
                      {!title.includes("Champlong -") && (
                        <>
                          <a
                            href={`${URL}/images/${folderName}/${photo.name}.jpg`}
                            className="btn btn-success bg-light"
                            onClick={(e) => e.stopPropagation()}
                            download
                          >
                            <Icon icon="download" size={1} />
                          </a>{" "}
                          {photo.isHdExist && (
                            // TODO remplacer les a par des link
                            <a
                              href={`${URL}/images/${folderName}/${photo.name.replace(
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
                        </>
                      )}
                    </Card>
                  )}
                </Col>
              ))}
          </Row>
          <Row style={{ marginTop: 24 }}>
            <Col span={24}>
              <Pagination
                showQuickJumper
                locale={{ jump_to: "Accéder à la page ", page: "" }}
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
                .sort(sortAsc)
                .filter(filterByName(filter))
                .filter(filterByTime(filterStartTime, filterEndTime))
                .map(
                  (photo: FormatedPhotosProps) =>
                    `${URL}/images/${folderName}/${photo.name}.jpg`
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
