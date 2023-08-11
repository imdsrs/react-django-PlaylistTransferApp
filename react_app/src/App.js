import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TryModal from "./components/modal/TryModal";
import HomeBody from "./components/HomeBody";
import LoginSpotify from "./components/LoginSpotify";
import LoginAppleMusic from "./components/LoginAppleMusic";
import LoginDeezer from "./components/LoginDeezer";
import LoginYoutubeMusic from "./components/LoginYoutubeMusic";
import GoogleSocialAuth from "./pages/GoogleSocialAuth";
// import LoginTryGoogle from "./views/login";
import GoogleAuth from "./pages/GoogleAuth";
import {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_AUTHORIZE_ENDPOINT,
    SPOTIFY_REDIRECT_URL_AFTER_LOGIN,
    SPOTIFY_SCOPES_URL_PARAM,
} from "./auth/SpotifyAuth.js";
import SpotifySuccess from "./components/SpotifySuccess";
import {
    DEEZER_APPLICATION_ID,
    DEEZER_AUTHORIZE_ENDPOINT,
    DEEZER_REDIRECT_URL_AFTER_LOGIN,
    DEEZER_SCOPES_URL_PARAM,
} from "./auth/DeezerAuth.js";
import DeezerSuccess from "./components/DeezerSuccess";
import ListSpotifyPlaylists from "./components/ListSpotifyPlaylists";
import TransferFromSpotify from "./components/TransferFromSpotify";
import React, { useEffect } from "react";

function App() {
    const handleSpotifyLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}&redirect_uri=${SPOTIFY_REDIRECT_URL_AFTER_LOGIN}&scope=${SPOTIFY_SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };
    const handleDeezerLogin = () => {
        window.location = `${DEEZER_AUTHORIZE_ENDPOINT}?app_id=${DEEZER_APPLICATION_ID}&redirect_uri=${DEEZER_REDIRECT_URL_AFTER_LOGIN}&perms=${DEEZER_SCOPES_URL_PARAM}`;
    };
    return (
        <Router>
            <div className="App">
                {/* {"hello"}
                {SPOTIFY_CLIENT_ID}
                {SPOTIFY_CLIENT_SECRET}
                {SPOTIFY_REDIRECT_URL_AFTER_LOGIN} */}
                <Header />
                <Routes>
                    {/* <Header /> */}
                    <Route path="/" exact element={<HomeBody />} />
                    <Route
                        path="/SpotifyLogin"
                        element={
                            <LoginSpotify handleLogin={handleSpotifyLogin} />
                        }
                    />
                    <Route
                        path="/SpotifySuccess"
                        element={<SpotifySuccess />}
                    />
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
                    {/* <Route path="/DeezerLogin" element={<LoginDeezer />} /> */}
                    <Route
                        path="/DeezerLogin"
                        element={
                            <LoginDeezer handleLogin={handleDeezerLogin} />
                        }
                    />
                    <Route path="/DeezerSuccess" element={<DeezerSuccess />} />
                    <Route
                        path="/ListSpotifyPlaylists/:destinationValue"
                        element={<ListSpotifyPlaylists />}
                    />
                    <Route
                        path="/TransferFromSpotify/:destinationValue/:playlistId"
                        element={<TransferFromSpotify />}
                    />
                </Routes>
                <Footer />
                {/* <TryModal /> */}
            </div>
        </Router>
    );
}

export default App;
