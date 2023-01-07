import Inventar from "../Components/Inventar.js";
import { useEffect, useState } from "react";
import {
  getCharacterNames,
  getItemsByCharacter,
  createCharacter,
  addItem as addItemBackend,
} from "../BackendAdapter.js";
import NavBar from "../Components/NavBar.js";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://iljerwmukflkawazktjy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsamVyd211a2Zsa2F3YXprdGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwNzYzMzEsImV4cCI6MTk4ODY1MjMzMX0.JxH5wsjqq87IvbXVZP0J0u544YDWmt44YVBOEWzXBd4"
);

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);
  const [characterNames, setCharacterNames] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState("");
  //const [waffen, setWaffen] = useState(["Schwert", "Armbrust"]);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
        } else {
          navigate("/");
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

    getUserData();
  }, []);

  const refreshCharacters = async () => {
    await getCharacterNames().then((names) => {
      setCharacterNames(names);
      if (currentCharacter === "") setCurrentCharacter(names[0]);
    });
  };

  const refreshItems = async () => {
    getItemsByCharacter(currentCharacter).then((items) => {
      setItems(items);
    });
  };

  useEffect(() => {
    refreshCharacters();
  }, []);

  useEffect(() => {
    refreshItems();
  }, [currentCharacter]);

  const removeItem = (index) => {
    let newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  const addItem = (item) => {
    addItemBackend(item, currentCharacter);
  };

  const selectCharacter = (characterName) => {
    setCurrentCharacter(characterName);
  };

  const addCharacter = (characterName) => {
    createCharacter(characterName).then(refreshCharacters());
  };

  const signOut = () => {
    supabase.auth.signOut();
    navigate("/");
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
          addItem={addItem}
          title="Mitgeführte Gegenstände"
        />
      ) : (
        <></>
      )}
      {currentCharacter ? (
        <Inventar
          items={items.filter((item) => !item.currentlyHeld)}
          removeItem={removeItem}
          addItem={addItem}
          title="Weitere Gegenstände"
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
