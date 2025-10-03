import { Routes, Route, Link } from "react-router-dom"; 
import { useState } from "react";
import Home from "./pages/home";
import AddProfile from "./pages/addprofile";
import About from "./pages/about";
import OtherProfiles from "./pages/otherprof";
import NotFound from "./pages/notfound";
import Header from "./components/header";

import FetchedProfiles from "./pages/fetchedprofiles";
import ProfileDetails from "./components/profiledetails";

const App = () => {
    return (
        <>
            <Header darkmode={darkMode} toggleMode={toggleMode} />

            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/addprofile">Add Profile</Link> |{" "}
                <Link to="/about">About</Link> |{" "}
                <Link to="/otherprofiles">Other Profiles</Link> |{" "}
                <Link to="/fetchedprofiles">Fetched Profiles</Link> |{" "}
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addprofile" element={<AddProfile />} />
                <Route path="/about" element={<About />} />
                <Route path="/otherprofiles" element={<OtherProfiles />} />
                <Route path="/fetchedprofiles" element={<FetchedProfiles />}>
                    <Route path="profile/:id" element={<ProfileDetails />} /> 
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;

