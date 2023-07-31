import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DeezerLogo } from "../assets/deezerLogo.svg";

const LogoDeezer = () => {
    return (
        // <Link to="/DeezerLogin" className="floating-button">
        <button class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 mr-5 md:mr-2">
            Deezer
            <div className="ml-2">
                <DeezerLogo />
            </div>
        </button>
        // </Link>
    );
};

export default LogoDeezer;
