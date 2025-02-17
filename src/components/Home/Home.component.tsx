import { Col, Divider, Row, Typography } from "antd";
import "./Home.scss";
const { Title, Text } = Typography;

export const Home = () => {
  console.log("home");

  return (
    <Row>
      <Col span={20} offset={2}>
        <Row>
          <Col span={24}>
            <Title style={{ marginTop: 12 }}>
              Bienvenue sur ma galerie photo ! 🎞️
            </Title>
          </Col>
          <Col span={24}>
            <Divider />
          </Col>
          <Col span={24}>
            <Text type="secondary">
              Ici, je partage une sélection de mes plus belles images, capturées
              avec passion, que ce soit lors des événements sportifs, de séances
              portrait, ou lors de moments épiques avec les chevaux. Chaque
              photo raconte une histoire, et j’espère qu’elles sauront toucher
              quelque chose en vous. N’hésitez pas à explorer, à apprécier, et à
              partager vos coups de cœur !
            </Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">
              N'hésitez pas à me contacter par mail (
              <em>à phan.gilles@gmail.com</em>) si vous rencontrez un bug ou que
              vous souhaitez me connseiler des fonctionnalités
            </Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
