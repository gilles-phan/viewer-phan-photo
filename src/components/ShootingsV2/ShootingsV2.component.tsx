import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { ShootingProps } from "../Shootings/Shootings.interface";
import {
  formatDate,
  getPathFromShooting,
  sortByShootingDate,
} from "../Shootings/Shootings.utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
const { Meta } = Card;
const { Title } = Typography;

const ShootingsV2 = () => {
  const [shootings, setShootings] = useState<ShootingProps[]>([]);

  const [filter, setFilter] = useState("");
  const [searchParams] = useSearchParams();
  const showHidden = searchParams.get("showHidden") === "true";

  const navigate = useNavigate();

  const search = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value.toLowerCase();
    setFilter(searchValue);
  };
  const clearSearch = () => setFilter("");

  const filterByHidden = (showHidden: boolean) => (shooting: ShootingProps) =>
    showHidden || !shooting.hidden;

  const filterBySearch = (shooting: ShootingProps) =>
    shooting.date.toLowerCase().includes(filter) ||
    shooting.description.toLowerCase().includes(filter) ||
    shooting.label.toLowerCase().includes(filter);

  useEffect(() => {
    fetch(
      "https://viewer.gils.xyz/backend/shooting/get-all.php" /*, { headers: getHeader() }*/
    )
      .then((response) => response.json())
      .then((data) => {
        setShootings(data.data);
      });
  }, []);

  return (
    <>
      <Row>
        <Col span={20} offset={2}>
          <Title style={{ marginTop: 12 }}>Shootings (v2)</Title>
          <Divider />
        </Col>
      </Row>
      <Row>
        <Col span={20} offset={2}>
          <Space.Compact style={{ width: "100%" }}>
            <Input addonBefore="Recherche" onChange={search}/>
              <Button onClick={clearSearch}>

                <CloseOutlined  />
              </Button>
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={20} offset={2}>
          <Row gutter={8}>
            {shootings
              .filter(filterByHidden(showHidden))
              .filter(filterBySearch)
              .sort(sortByShootingDate)
              .reverse()
              .map((shooting, id) => (
                <Col key={id} xs={24} md={12} xl={6} xxl={4}>
                  <Card
                    onClick={() => navigate(shooting.uuid)}
                    hoverable
                    style={{ width: "100%", height: "98%", marginTop: 8 }}
                    cover={
                      <img
                        alt={`Shooting : ${shooting.label}`}
                        src={getPathFromShooting(shooting)}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = "images/404.jpg";
                        }}
                      />
                    }
                  >
                    <Meta
                      title={shooting.label}
                      description={shooting.description || "-"}
                    />
                    <Tag>{formatDate(shooting.date)}</Tag>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ShootingsV2;
