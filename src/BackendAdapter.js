import { createClient } from "@supabase/supabase-js";
import Preis from "./Classes/Preis";

const supabase = createClient(
  "https://iljerwmukflkawazktjy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsamVyd211a2Zsa2F3YXprdGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwNzYzMzEsImV4cCI6MTk4ODY1MjMzMX0.JxH5wsjqq87IvbXVZP0J0u544YDWmt44YVBOEWzXBd4"
);

export async function getCharacterNames() {
  let { data: characters, error } = await supabase
    .from("characters")
    .select("name");
  if (error) {
    return [];
  } else {
    return characters.map((char) => char.name);
  }
}

export async function getItemsByCharacter(characterName) {
  let { data: character, error1 } = await supabase
    .from("characters")
    .select("id")
    .eq("name", characterName);
  if (error1 || character.length < 1) {
    return [];
  }
  let characterId = character[0].id;
  let { data: inventory, error2 } = await supabase
    .from("inventory")
    .select("*")
    .eq("owning_character", characterId);
  if (error2) {
    return [];
  }
  if (!(typeof inventory === typeof [])) {
    inventory = [inventory];
  }

  return inventory.map((item) => {
    return {
      name: item.name,
      einzelgewicht: item.gewicht,
      einheit: item.einheit,
      menge: item.menge,
      preis: new Preis(item.preis),
      currentlyHeld: item.currently_held,
      handelszonen: "",
    };
  });
}

export async function createCharacter(characterName) {
  let uid = (await supabase.auth.getUser()).data.user.id;
  await supabase
    .from("characters")
    .insert([{ name: characterName, user_id: uid }]);
}

export async function addItem(item, characterName) {
  let { data: character, error1 } = await supabase
    .from("characters")
    .select("id")
    .eq("name", characterName);
  if (error1 || character.length < 1) {
    return;
  }
  let characterId = character[0].id;
  await supabase.from("inventory").insert([
    {
      menge: item.menge,
      einheit: item.einheit,
      name: item.name,
      preis: item.preis.getValueInKreuzer(),
      gewicht: item.einzelgewicht,
      owning_character: characterId,
      currently_held: true,
    },
  ]);
}
