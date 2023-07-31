import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SpotifyLogin from "./components/modal/SpotifyLogin";
import HomeBody from "./components/HomeBody";
import LoginSpotify from "./components/LoginSpotify";
import LoginAppleMusic from "./components/LoginAppleMusic";
import LoginDeezer from "./components/LoginDeezer";
import LoginYoutubeMusic from "./components/LoginYoutubeMusic";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    {/* <Header /> */}
                    <Route path="/" exact element={<HomeBody />} />
                    <Route path="/SpotifyLogin" element={<LoginSpotify />} />
                    <Route
                        path="/YoutubeMusicLogin"
                        element={<LoginYoutubeMusic />}
                    />
                    <Route
                        path="/AppleMusicLogin"
                        element={<LoginAppleMusic />}
                    />
                    <Route path="/DeezerLogin" element={<LoginDeezer />} />
                </Routes>
                <Footer />
                <SpotifyLogin />
            </div>
        </Router>
    );
}

export default App;
