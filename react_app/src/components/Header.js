import LogoAppleMusic from "./LogoAppleMusic";
import LogoDeezer from "./LogoDeezer";
import LogoSpotify from "./LogoSpotify";
import LogoYoutubeMusic from "./LogoYoutubeMusic";
import { ReactComponent as InfoButton } from "../assets/info.svg";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="app-header">
            {/* <h1>Notes List</h1> */}
            <header class="text-gray-400 bg-gray-900 body-font">
                <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link
                        to="/"
                        class="flex title-font font-medium items-center text-white mb-4 md:mb-0"
                    >
                        {/* <a > */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span class="ml-3 text-xl">Playlist Transfer App</span>
                        {/* </a> */}
                    </Link>
                    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link to="/SpotifyLogin" className="floating-button">
                            <LogoSpotify />
                        </Link>

                        <Link
                            to="/YoutubeMusicLogin"
                            className="floating-button"
                        >
                            <LogoYoutubeMusic />
                        </Link>

                        <Link to="/AppleMusicLogin" className="floating-button">
                            <LogoAppleMusic />
                        </Link>

                        <Link to="/DeezerLogin" className="floating-button">
                            <LogoDeezer />
                        </Link>
                    </nav>
                    {/* <button class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 mr-5 md:mr-2">
                        Button
                        <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-4 h-4 ml-1"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button> */}
                    <InfoButton />
                </div>
            </header>
        </div>
    );
};

export default Header;
