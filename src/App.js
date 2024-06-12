import "./App.css";
import Mother from "./components/Mother";
import { Typewriter } from "react-simple-typewriter";

function App() {
  return (
    <div className="h-screen" style={{ position: "relative" }}>
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-4 App-header">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold text-white">TODO APP</h1>
        </div>
      </header>
      <Mother />
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white">
            <span style={{ color: "red", fontWeight: "bold" }}>
              <Typewriter
                words={["thank you for the ", " using our site"]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={0}
                deleteSpeed={0}
                delaySpeed={1000}
              />
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
