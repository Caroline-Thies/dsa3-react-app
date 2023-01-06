class Preis {
  constructor(valueInKreuzer) {
    this.valueInKreuzer = valueInKreuzer;
  }

  toString() {
    let kreuzer = this.valueInKreuzer;
    const dukaten = Math.floor(kreuzer / 1000);
    kreuzer -= 1000 * dukaten;
    const silbertaler = Math.floor(kreuzer / 100);
    kreuzer -= 100 * silbertaler;
    const heller = Math.floor(kreuzer / 10);
    kreuzer -= 10 * heller;

    const dukatenText = dukaten > 0 ? dukaten + "D " : "";
    const silbertalerText = silbertaler > 0 ? silbertaler + "ST " : "";
    const hellerText = heller > 0 ? heller + "H " : "";
    const kreuzerText =
      dukatenText + silbertalerText + hellerText === "" || kreuzer > 0
        ? kreuzer + "K"
        : "";
    console.log("found" + dukaten + silbertaler + heller + kreuzer);
    return dukatenText + silbertalerText + hellerText + kreuzerText;
  }

  getValueInKreuzer() {
    return this.valueInKreuzer;
  }
}

export default Preis;
