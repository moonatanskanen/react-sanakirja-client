import { useState } from "react";

function Newword() {
  const [finword, setfinword] = useState(""); //suomenkielinen laatikko
  const [engword, setengword] = useState(""); //englanninkielinen laatikko
  const [viesti, setviesti] = useState(""); //onnistumisviestit

  async function createWordPair() {
    if (finword.trim() === "" || engword.trim() === "") {
      //tarkistetaan ettei laatikot ole tyhjiä
      setviesti("Et voi lisätä vajaata sanaparia!");
      return;
    }

    try {
      //kutsutaan sanakirja serveriä
      const response = await fetch("http://localhost:3000/sanakirja", {
        method: "POST", //ei ole oletuksena get
        headers: { "Content-Type": "application/json" }, //kertoo, että lähetettävä data on JSONia, jotta tunnistetaan body
        body: JSON.stringify({ fin: finword, eng: engword }), //asetetaan bodyn tietoihin fin = sana joka on fin laatikossa, eng = sana joka on eng laatikossa
      });

      //jos kaikki onnistuu:
      if (response.ok) {
        setengword("");
        setfinword("");
        setviesti("Lisäys onnistui!");
      }
    } catch (error) {
      //napataan mahdolliset muut virheet
      setviesti("Tapahtui virhe!");
    }
  }

  return (
    <div className="newWord">
      <h2 className="translator-header">Luo uusi sanapari</h2>
      <div className="translator-boxes">
        <div className="translator-box">
          <h3 className="translator-little-headers">Suomi</h3>
          <textarea
            name="FINinput"
            id="input"
            value={finword}
            onChange={(e) => setfinword(e.target.value)} //set arvoa voidaan käyttää ikäänkuin metodina, joka ottaa tietoa vastaan, arvon muuttuessa se tunnistetaan
          ></textarea>
        </div>
        <div className="translator-arrow">
          <span>→</span>
        </div>
        <div className="translator-box">
          <h3 className="translator-little-headers">Englanti</h3>
          <textarea
            name="ENGoutput"
            id="output"
            value={engword}
            onChange={(e) => setengword(e.target.value)}
          ></textarea>
        </div>
        <div className="translator-button">
          <button onClick={createWordPair}>Lisää</button>
          <p className="tiny-message">{viesti}</p>
        </div>
      </div>
    </div>
  );
}

export default Newword;
