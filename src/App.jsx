import { Routes, Route, Link } from "react-router-dom"; 
import { useContext } from "react";

import Home from "./pages/Home.jsx";
import AddProfiles from "./pages/AddProfiles.jsx";
import About from "./pages/About.jsx";
import OtherProfiles from "./pages/OtherProf.jsx";
import NotFound from "./pages/NotFound.jsx";
import Header from "./components/Header.jsx";
import FetchedProfiles from "./pages/FetchedProfiles.jsx";
import ProfilesDetails from "./components/ProfilesDetails.jsx";

import { ModeContext } from "./contexts/ModeContext";

const App = () => {
  const { darkMode, toggleMode } = useContext(ModeContext);

  return (
    <>
      <Header darkMode={darkMode} toggleMode={toggleMode} />

      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/addprofiles">Add Profile</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/otherprofiles">Other Profiles</Link> |{" "}
        <Link to="/fetchedprofiles">Fetched Profiles</Link>
      </nav>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addprofiles" element={<AddProfiles />} />
            <Route path="/about" element={<About />} />
            <Route path="/otherprofiles" element={<OtherProfiles />} />
            <Route path="/fetchedprofiles" element={<FetchedProfiles />}>
                <Route path="profiles/:id" element={<ProfilesDetails />} /> 
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
};

export default App;


