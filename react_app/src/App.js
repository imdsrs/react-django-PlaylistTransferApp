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
import GoogleSocialAuth from "./pages/GoogleSocialAuth";
// import LoginTryGoogle from "./views/login";
import GoogleAuth from "./pages/GoogleAuth";

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
                        // element={<GoogleSocialAuth />}
                        element={<LoginYoutubeMusic />}
                        // element={<LoginTryGoogle />}
                        // element={<GoogleAuth />}
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
