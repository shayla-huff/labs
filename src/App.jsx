import { Routes, Route, Link } from "react-router-dom"; 
import Home from "./pages/Home.jsx";
import AddProfiles from "./pages/AddProfiles.jsx";
import About from "./pages/About.jsx";
import OtherProfiles from "./pages/OtherProf.jsx";
import NotFound from "./pages/NotFound.jsx";
import Header from "./components/Header.jsx";
import FetchedProfiles from "./pages/FetchedProfiles.jsx";
import ProfileDetails from "./components/ProfilesDetails.jsx";

import { ProfilesProvider } from "./contexts/ProfilesContext";
import { ModeProvider } from "./contexts/ModeContext";

const App = () => {
    return (
        <ModeProvider>
            <ProfilesProvider>
                <Header />   

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
                        <Route path="profiles/:id" element={<ProfileDetails />} /> 
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ProfilesProvider>
        </ModeProvider>
    );
};

export default App;


