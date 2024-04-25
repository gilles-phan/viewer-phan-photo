import { navigation } from "./Menu.utils";

export const Menu = () => {
  return (
    <ul>
      {navigation.map((item, id) => (
        <li key={id}>
          <a href={item.link}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
};
