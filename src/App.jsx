import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home";
import AddProfile from "./pages/addprofile";
import About from "./pages/about";
import OtherProfiles from "./pages/otherprof";
import NotFound from "./pages/notfound";
import Header from "./components/header";

const App = () => {
    const [cards, setCards] = useState([]);

    return (
        <HashRouter>
            <Header />

            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/addprofile">Add Profile</Link> |{" "}
                <Link to="/about">About</Link> |{" "}
                <Link to="/otherprofiles">Other Profiles</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home cards={cards} setCards={setCards} />} />
                <Route path="/addprofile" element={<AddProfile setCards={setCards}/>} />
                <Route path="/about" element={<About />} />
                <Route path="/otherprofiles" element={<OtherProfiles />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </HashRouter>
    );
};

export default App;

