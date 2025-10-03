import Filters from '../components/filters.jsx'
import { useContext, useEffect } from 'react';
import { ModeContext } from '../context/modecontext.jsx';
import { ProfileContext } from '../context/profilecontext.jsx';
import { fetchTitles, fetchProfiles } from "../components/fetchdata.jsx";

const Home = () => {
    const { darkMode } = useContext(ModeContext);
    const { profiles, setProfiles } = useContext(ProfileContext);

    useEffect(() => {
        fetchProfiles().then(data => setProfiles(data));
    }, [setProfiles]);

    return (
        <div className={darkMode ? "dark" : "light"}>
            <h2>Home</h2>
            <Filters />
            {/* render profiles here */}
        </div>
    );
};

export default Home;