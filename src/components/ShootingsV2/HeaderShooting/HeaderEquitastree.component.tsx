import { Typography, Col } from "antd";
const { Title, Text } = Typography;

const HeaderEquitastree = () => (
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
      <strong style={{ marginLeft: 16 }}>
        Exemple : D85_7856, Z91_4577, Z91_4577
      </strong>
      <Title level={3}>
        <Text type="secondary">2️⃣ Commande :</Text>
      </Title>
      <strong style={{ marginLeft: 16 }}>
        Réalisez le paiement via l'un des pack ci-dessous, puis envoyez moi un
        mail à{" "}
        <a href="mailto:phan.gilles@gmail.com?subject=Question%20concernant%20les%20commandes%20photos">
          phan.gilles@gmail.com
        </a>{" "}
        avec votre email et les photos désirées. Vous recevrez vos photos
        retravaillées sous quelques jours.
      </strong>
      <ul style={{ marginLeft: 24 }}>
        <li>
          <a target="_blank" href="https://buy.stripe.com/8wMaGIcrdbWA6je7ss">
            Photo numérique (x1) - 10€
          </a>
        </li>
        <li>
          <a target="_blank" href="https://buy.stripe.com/14kbKM0Iv7GkgXS145">
            Photo numérique (x3) - 20€
          </a>
        </li>
        <li>
          <a target="_blank" href="https://buy.stripe.com/3csaGIgHt5yc8rm4gi">
            Photo numérique (x5) - 30€
          </a>
        </li>
        <li>
          <a target="_blank" href="https://buy.stripe.com/aEU5mobn98Koazu4gm">
            Photo numérique (passage complet) - 50€, +20€/passage sup.
          </a>
        </li>
        <li>
          <a target="_blank" href="https://buy.stripe.com/00g024gHte4IdLG6ov">
            Tirage papier (x1) - 15€
          </a>
        </li>
        <li>
          <a target="_blank" href="https://buy.stripe.com/eVa024aj53q4dLG4go">
            Tirage papier (x3) - 30€
          </a>
        </li>
        <li>
          <a target="_blank" href="https://buy.stripe.com/7sI4ikaj51hW7ni7sB">
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
        ou par téléphone au <a href="tel:+33682509580">06 82 50 95 80</a>
      </Text>
    </Col>
  </>
);

export default HeaderEquitastree;
