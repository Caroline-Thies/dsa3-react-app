import { useState } from "react";
import AddElement from "./AddElement";
import ElementList from "./ElementList";

export default function Inventar(props) {
  const addItem = (newStringItem) => {
    console.log("before parsing: " + JSON.stringify(newStringItem));
    let newItem = {
      name: newStringItem.name,
      einzelgewicht:
        Number(newStringItem.einzelgewicht) === ""
          ? 0
          : Number(newStringItem.einzelgewicht),
      menge:
        Number(newStringItem.menge) === "" ? 1 : Number(newStringItem.menge),
      einheit: newStringItem.einheit,
    };
    props.addItem(newItem);
  };

  const renderGewicht = (item) => {
    if (item.menge === 1) return item.einzelgewicht + " Unzen";
    return (
      "je " +
      item.einzelgewicht +
      " Unzen (Gesamtgewicht: " +
      item.menge * item.einzelgewicht +
      " Unzen)"
    );
  };

  return (
    <>
      <ElementList
        title="Inventar"
        elements={props.items.map(
          (item) =>
            item.menge +
            " " +
            item.einheit +
            " " +
            item.name +
            ", " +
            renderGewicht(item)
        )}
        deleteElement={props.removeItem}
      />
      <AddElement
        attributes={["name", "einzelgewicht", "menge", "einheit"]}
        addElement={addItem}
      />
    </>
  );
}
