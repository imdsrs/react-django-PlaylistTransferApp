import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as SpotifyLogo } from "../assets/spotifyLogo.svg";

const LogoSpotify = () => {
    return (
        // <Link to="/SpotifyLogin" className="floating-button">
        <button class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 mr-5 md:mr-2">
            Spotify
            <div className="ml-2">
                <SpotifyLogo />
            </div>
        </button>
        // </Link>
    );
};

export default LogoSpotify;
