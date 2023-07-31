import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AppleMusicLogo } from "../assets/appleMusicLogo.svg";

const LogoAppleMusic = () => {
    return (
        // <Link to="/AppleMusicLogin" className="floating-button">
        <button class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 mr-5 md:mr-2">
            Apple Music
            <div className="ml-2">
                <AppleMusicLogo />
            </div>
        </button>
        // </Link>
    );
};

export default LogoAppleMusic;
