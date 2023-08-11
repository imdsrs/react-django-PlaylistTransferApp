import React from "react";
import { ReactComponent as SpotifyLogo96px } from "../assets/spotifyLogo_96px.svg";

const LoginSpotify = (props) => {
    return (
        // <div>
        //     <p>Spotify Login Page Here!</p>
        // </div>
        <div class="text-gray-400 bg-gray-900 body-font h-[65vh]">
            <br />
            <span class="flex justify-center items-center">
                <SpotifyLogo96px />
                <div className="text-center px-10 py-5 text-4xl">Spotify</div>
            </span>
            <br />
            <br />
            <br />
            <br />
            <span class="">
                <button
                    className="bg-green-400 text-white rounded-2xl px-4 py-4"
                    onClick={() => props.handleLogin()}
                >
                    Login with Spotify
                </button>
            </span>
        </div>
    );
};

export default LoginSpotify;
