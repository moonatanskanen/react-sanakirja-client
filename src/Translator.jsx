import { useState } from "react";

function Translator() {
  const [finword, setfinword] = useState(""); //suomenkielinen laatikko
  const [engword, setengword] = useState(""); //englanninkielinen laatikko
  //[teksti] = get, [setTeksti] = set, useState=määrittää tekstin vakioarvoksi ("") --> useState sisällä voi olla myös esim. lista, numeroita yms.
  //setTekstiä voidaan käyttää erillään ikäänkuin metodina esim. setTeksti("..."), johon voidaan hakea tietty arvo
  //useState tunnistaa muutokset ja päivittää ne automaattisesti
  async function translateWord() {
    if (finword.trim() === "") {
      //tarkistetaan tyhjä laatikko
      setengword("Kirjoita suomenkielinen sana!");
      return;
    }

    try {
      //kutsutaan sanakirja serveriä
      const response = await fetch(
        `http://localhost:3000/sanakirja/${finword.trim().toLowerCase()}`,
      ); //leikataan samalla välilyönnit yms pois ja muutetaan sanan kirjaimet pieniksi

      //jos kyseistä sanaa ei löydy:
      if (!response.ok) {
        setengword("Kyseistä sanaa ei löytynyt sanakirjasta!");
      }

      const data = await response.json();
      console.log(data);
      setengword(data); //asetetaan datan mukana tullut englannin kielinen sana (jsonissa on määritetty fin ja eng)
    } catch (error) {
      //napataan mahdolliset muut virheet
      setengword("Tapahtui virhe!");
    }
  }

  return (
    <div className="translator">
      <h2 className="translator-header">Kääntäjä</h2>
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
            readOnly
          ></textarea>
        </div>
        <div className="translator-button">
          <button onClick={translateWord}>Käännä</button>
        </div>
      </div>
    </div>
  );
}

export default Translator;
