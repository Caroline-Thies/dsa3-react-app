import Preis from "./Classes/Preis";
import data from "./data.json";

export async function getCharacterNames() {
  return Object.keys(data);
}

export async function getItemsByCharacter(characterName) {
  if (Object.keys(data).includes(characterName)) {
    let inventar = data[characterName].Inventar;
    inventar.map((item) => (item.preis = new Preis(item.preis)));
    return inventar;
  } else {
    return [];
  }
}

export async function createCharacter(characterName) {
  data[characterName] = { Inventar: [] };
}
