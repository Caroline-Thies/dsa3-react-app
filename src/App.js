import Inventar from "./Components/Inventar.js";
import "./App.css";
import { useEffect, useState } from "react";
import Waffen from "./Components/Waffen.js";
import {
  getCharacterNames,
  getItemsByCharacter,
  createCharacter,
  getPriceTest,
} from "./BackendAdapter.js";
import NavBar from "./Components/NavBar.js";
import Preis from "./Classes/Preis.js";

function App() {
  const [items, setItems] = useState([]);
  const [characterNames, setCharacterNames] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState("");
  //const [waffen, setWaffen] = useState(["Schwert", "Armbrust"]);
  const refreshCharacters = async () => {
    await getCharacterNames().then((names) => {
      setCharacterNames(names);
      setCurrentCharacter(names[0]);
    });
  };

  useEffect(() => {
    refreshCharacters();
  }, []);

  useEffect(() => {
    getItemsByCharacter(currentCharacter).then((items) => {
      setItems(items);
    });
  }, [currentCharacter]);

  const removeItem = (index) => {
    let newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  const addItem = (item) => {
    let newItems = items.concat([item]);
    setItems(newItems);
  };

  const selectCharacter = (characterName) => {
    setCurrentCharacter(characterName);
  };

  const addCharacter = (characterName) => {
    createCharacter(characterName).then(
      refreshCharacters(characterNames.length)
    );
  };

  return (
    <div className="App">
      <NavBar
        characters={characterNames}
        selectCharacter={selectCharacter}
        addCharacter={addCharacter}
      />
      {currentCharacter ? (
        <Inventar items={items} removeItem={removeItem} addItem={addItem} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
