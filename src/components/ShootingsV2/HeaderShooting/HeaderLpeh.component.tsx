import { Typography, Col } from "antd";
const { Title, Text } = Typography;

const HeaderLpeh = () => (
  <>
    <Col span={24}>
      <Title level={2}>
        <Text type="secondary">Procédures pour commander des photos</Text>
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
        <Text type="secondary">2️⃣ Les tarifs</Text>
      </Title>
      <Text style={{ marginLeft: 16 }}>Les tarifs sont les suivants :</Text>
      <ul style={{ marginLeft: 24 }}>
        <li>1 Photo : 10€</li>
        <li>3 Photos : 20€</li>
        <li>5 Photos : 30€</li>
        <li>
          Toutes vos Photos : 50€ (⚠️ pour les photos sur fond, seule deux
          seront traitées)
        </li>
      </ul>
      <Text style={{ marginLeft: 16 }}>
        <strong>Notes</strong> : Les photos sont retravaillées avant l'envoie.
        Si vous avez des demandes particulière, n'hésitez pas à me le préciser.
      </Text>

      <Title level={3}>
        <Text type="secondary">3️⃣ La commande</Text>
      </Title>
      <Text style={{ marginLeft: 16 }}>Pour commander il faudra ensuite :</Text>
      <ul style={{ marginLeft: 24 }}>
        <li>
          Faire un virement à Glad avec la desction suivante : "Photos Gilles
          Avril 2025"
        </li>
        <li>
          Me faire un mail à{" "}
          <a href="mailto:phan.gilles@gmail.com?subject=Commande%20Photos%20Pouns">
            phan.gilles@gmail.com
          </a>{" "}
          avec la capture d'écran du virement à Glad et me donner les photos que
          vous désirez
        </li>
      </ul>
      <Text style={{ marginLeft: 16 }}>
        Vous recevrez ensuite les photos <strong>traitées</strong> sous 48h.
      </Text>

      <Title level={3}>
        <Text type="secondary">📩 Une question ?</Text>
      </Title>
      <Text style={{ marginLeft: 16 }}>
        Afin de fluidifier les commandes, contactez-moi directement par{" "}
        <a href="mailto:phan.gilles@gmail.com?subject=Question%20concernant%20les%20commandes%20photos">
          email
        </a>{" "}
        ou par téléphone au <a href="tel:+33682509580">06 82 50 95 80</a>
      </Text>
    </Col>
  </>
);

export default HeaderLpeh;
