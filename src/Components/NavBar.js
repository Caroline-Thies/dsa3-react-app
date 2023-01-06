import { useEffect, useState } from "react";
import AddElement from "./AddElement";

export default function NavBar(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <span className="flexrow">
      {props.characters.map((char, index) => {
        let className =
          index === selectedIndex
            ? "navbar-item selected-navbar-item"
            : "navbar-item";
        return (
          <span
            className={className}
            onClick={() => {
              props.selectCharacter(char);
              setSelectedIndex(index);
            }}
            key={index}
          >
            {char}{" "}
          </span>
        );
      })}
      <AddElement
        attributes={["neuer Charakter"]}
        addElement={(data) => props.addCharacter(data["neuer Charakter"])}
      />
    </span>
  );
}
