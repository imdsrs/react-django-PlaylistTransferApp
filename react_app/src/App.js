import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeBody from "./components/HomeBody";
import LoginSpotify from "./components/LoginSpotify";
import LoginAppleMusic from "./components/LoginAppleMusic";
import LoginDeezer from "./components/LoginDeezer";
import LoginYoutubeMusic from "./components/LoginYoutubeMusic";

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
import React from "react";
import ListDeezerPlaylists from "./components/ListDeezerPlaylists";
import TransferFromDeezer from "./components/TransferFromDeezer";
import ListYoutubeMusicPlaylists from "./components/ListYoutubeMusicPlaylists";
import TransferFromYoutubeMusic from "./components/TransferFromYoutubeMusic";

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
                        element={<LoginYoutubeMusic />}
                    />
                    <Route
                        path="/YoutubeSuccess"
                        element={<SpotifySuccess />}
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
                    {/* Components for Transferring Items from Spotify to Deezer */}
                    <Route
                        path="/ListSpotifyPlaylists/:destinationValue"
                        element={<ListSpotifyPlaylists />}
                    />
                    <Route
                        path="/TransferFromSpotify/:destinationValue/:playlistId"
                        element={<TransferFromSpotify />}
                    />
                    {/* Components for Transferring Items from Deezer to Spotify */}
                    <Route
                        path="/ListDeezerPlaylists/:destinationValue"
                        element={<ListDeezerPlaylists />}
                    />
                    <Route
                        path="/TransferFromDeezer/:destinationValue/:playlistId"
                        element={<TransferFromDeezer />}
                    />
                    {/* Components for Transferring Items from Youtube to Spotify */}
                    <Route
                        path="/ListYoutubeMusicPlaylists/:destinationValue"
                        element={<ListYoutubeMusicPlaylists />}
                    />
                    <Route
                        path="/TransferFromYoutubeMusic/:destinationValue/:playlistId"
                        element={<TransferFromYoutubeMusic />}
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
