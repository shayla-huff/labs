import { Routes, Route, Link } from "react-router-dom"; 
import Home from "./pages/home";
import AddProfiles from "./pages/addprofiles";
import About from "./pages/about";
import OtherProfiles from "./pages/otherprof";
import NotFound from "./pages/notfound";
import Header from "./components/header";
import FetchedProfiles from "./pages/fetchedprofiles";
import ProfileDetails from "./components/profilesdetails";

import { ProfilesProvider } from "../contexts/profilescontext";
import { ModeProvider } from "../contexts/modecontext";

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


