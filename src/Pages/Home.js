import Inventar from "../Components/Inventar.js";
import { useCallback, useEffect, useState } from "react";
import {
  getCharacterNames,
  getItemsByCharacter,
  createCharacter,
  addItem as addItemBackend,
  removeItem,
} from "../BackendAdapter.js";
import NavBar from "../Components/NavBar.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://iljerwmukflkawazktjy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsamVyd211a2Zsa2F3YXprdGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwNzYzMzEsImV4cCI6MTk4ODY1MjMzMX0.JxH5wsjqq87IvbXVZP0J0u544YDWmt44YVBOEWzXBd4"
);

function Home(props) {
  const [items, setItems] = useState([]);
  const [characterNames, setCharacterNames] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState("");
  //const [waffen, setWaffen] = useState(["Schwert", "Armbrust"]);

  const refreshCharacters = useCallback(async () => {
    await getCharacterNames().then((names) => {
      setCharacterNames(names);
      if (currentCharacter === "") setCurrentCharacter(names[0]);
    });
  }, [currentCharacter]);

  const refreshItems = useCallback(async () => {
    getItemsByCharacter(currentCharacter).then((items) => {
      setItems(items);
    });
  }, [currentCharacter]);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (!value.data?.user) {
          props.navigate("Login");
        }
      });
    }

    supabase
      .channel("public:characters")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "characters" },
        (payload) => {
          refreshCharacters();
        }
      )
      .subscribe();

    supabase
      .channel("public:inventory")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "inventory" },
        (payload) => {
          console.log("Update received! ", payload);
          refreshItems();
        }
      )
      .subscribe();

    supabase
      .channel("public:inventory")
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "inventory" },
        (payload) => {
          console.log("Update received! ", payload);
          refreshItems();
        }
      )
      .subscribe();

    getUserData();
  }, [props, refreshItems, refreshCharacters]);

  useEffect(() => {
    refreshCharacters();
  }, [refreshCharacters]);

  useEffect(() => {
    refreshItems();
  }, [currentCharacter, refreshItems]);

  const addItem = (item, currentlyHeld) => {
    addItemBackend(item, currentlyHeld, currentCharacter);
  };

  const selectCharacter = (characterName) => {
    setCurrentCharacter(characterName);
  };

  const addCharacter = (characterName) => {
    createCharacter(characterName).then(refreshCharacters());
  };

  const signOut = () => {
    supabase.auth.signOut();
    props.navigate("Login");
  };

  const deleteItem = (item_id) => {
    removeItem(item_id);
  };
  return (
    <div className="Home">
      <NavBar
        characters={characterNames}
        selectCharacter={selectCharacter}
        addCharacter={addCharacter}
      />
      {currentCharacter ? (
        <Inventar
          items={items.filter((item) => item.currentlyHeld)}
          removeItem={removeItem}
          addItem={(item) => addItem(item, true)}
          title="Mitgeführte Gegenstände"
          deleteItem={deleteItem}
        />
      ) : (
        <></>
      )}
      {currentCharacter ? (
        <Inventar
          items={items.filter((item) => !item.currentlyHeld)}
          removeItem={removeItem}
          addItem={(item) => addItem(item, false)}
          title="Weitere Gegenstände"
          deleteItem={deleteItem}
        />
      ) : (
        <></>
      )}
      <div onClick={signOut} class="button">
        Abmelden
      </div>
    </div>
  );
}

export default Home;
