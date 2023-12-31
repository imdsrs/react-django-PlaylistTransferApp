import React from "react";
import { ReactComponent as YoutubeMusicLogo } from "../assets/youtubeMusicLogo.svg";

const LogoYoutubeMusic = () => {
    return (
        // <Link to="/YoutubeMusicLogin" className="floating-button">
        <button class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 mr-5 md:mr-2">
            Youtube Music
            <div className="ml-2">
                <YoutubeMusicLogo />
            </div>
        </button>
        // </Link>
    );
};

export default LogoYoutubeMusic;
