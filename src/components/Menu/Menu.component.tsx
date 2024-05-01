import { Fragment } from "react/jsx-runtime";
import { navigation } from "./Menu.utils";

export const Menu = () => {
  return (
    <ul>
      {navigation.map((item, id) => {
        if (item.hidden) {
          return <Fragment key={id}></Fragment>;
        } else {
          return (
            <li key={id}>
              <a href={item.link}>{item.label}</a>
            </li>
          );
        }
      })}
    </ul>
  );
};
