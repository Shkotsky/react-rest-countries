import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SingleCountry from "./pages/SingleCountry";
import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("Light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "Light" ? "Dark" : "Light"));
    console.log(theme);
  };
  return (
    <ThemeContext.Provider value={(theme, setTheme)}>
      <div className="App" id={theme}>
        <Router>
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/country/:alpha3Code" element={<SingleCountry />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
