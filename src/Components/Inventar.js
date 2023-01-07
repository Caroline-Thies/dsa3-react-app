import { useState } from "react";
import Preis from "../Classes/Preis";
import AddElement from "./AddElement";
import ElementList from "./ElementList";
import Table from "./Table";

export default function Inventar(props) {
  const addItem = (newStringItem) => {
    console.log("before parsing: " + JSON.stringify(newStringItem));
    let newItem = {
      name: newStringItem.name,
      einzelgewicht:
        newStringItem["einzelgewicht in unzen"] === ""
          ? 0
          : Number(newStringItem["einzelgewicht in unzen"]),
      menge: newStringItem.menge === "" ? 1 : Number(newStringItem.menge),
      einheit: newStringItem.einheit,
      preis:
        newStringItem["preis in kreuzern"] === ""
          ? new Preis(0)
          : new Preis(Number(newStringItem["preis in kreuzern"])),
      handelszonen: newStringItem.handelszonen,
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

  const items = props.items ? props.items : [];
  let gesamtgewicht = 0;
  items.map((item) => (gesamtgewicht += item.einzelgewicht * item.menge));

  let displayItems = items.map((item) => {
    return {
      ...item,
      gesamtgewicht: item.menge * item.einzelgewicht,
      gesamtpreis: new Preis(item.menge * item.preis.getValueInKreuzer()),
    };
  });

  let title = props.title ? props.title : "Inventar";
  return (
    <>
      <h1>{title}</h1>
      <Table
        data={displayItems}
        columns={[
          "menge",
          "einheit",
          "name",
          "preis",
          "gesamtpreis",
          "einzelgewicht",
          "gesamtgewicht",
          "handelszonen",
        ]}
      />
      <p>Gesamtgewicht: {gesamtgewicht} Unzen</p>
      <AddElement
        attributes={[
          "name",
          "einzelgewicht in unzen",
          "menge",
          "einheit",
          "preis in kreuzern",
          "handelszonen",
        ]}
        addElement={addItem}
      />
    </>
  );
}
