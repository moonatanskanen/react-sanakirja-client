import "./index.css";
import Translator from "./Translator";
import Newword from "./Newword";

//this is the whole layout for the web page
function App() {
  return (
    <>
      {/* This is the title of my page */}
      <h1>Hello, welcome to translator!</h1>
      <Translator />
      <Newword />
    </>
  );
}
export default App;
