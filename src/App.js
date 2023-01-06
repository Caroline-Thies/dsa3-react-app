import Inventar from "./Components/Inventar.js";
import "./App.css";
import { useState } from "react";
import Waffen from "./Components/Waffen.js";

function App() {
  const [items, setItems] = useState([
    { name: "Helm", einzelgewicht: 50, einheit: "Stück", menge: 1 },
    { name: "Brustplatte", einzelgewicht: 200, einheit: "Stück", menge: 1 },
    { name: "Gold", einzelgewicht: 12, einheit: "Barren", menge: 5 },
  ]);
  const [waffen, setWaffen] = useState(["Schwert", "Armbrust"]);

  const removeItem = (index) => {
    let newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  const addItem = (item) => {
    console.log(item);
    let newItems = items.concat([item]);
    setItems(newItems);
  };

  const removeWaffe = (index) => {
    let newWaffen = waffen.filter((waffe, i) => i !== index);
    setWaffen(newWaffen);
  };

  const addWaffe = (waffe) => {
    let newWaffen = waffen.concat([waffe]);
    setWaffen(newWaffen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Inventar items={items} removeItem={removeItem} addItem={addItem} />
        </p>
      </header>
    </div>
  );
}

export default App;
