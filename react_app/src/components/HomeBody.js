import React from "react";
import { ReactComponent as SpotifyLogo } from "../assets/spotifyLogo.svg";
import { ReactComponent as YoutubeMusicLogo } from "../assets/youtubeMusicLogo.svg";
import { ReactComponent as AppleMusicLogo } from "../assets/appleMusicLogo.svg";
import { ReactComponent as DeezerLogo } from "../assets/deezerLogo.svg";
import { Link } from "react-router-dom";

// const testCSS = {
//     vertical-align: "bottom"
// };

const HomeBody = () => {
    return (
        <div>
            {/* <h1>Main body here!!</h1>
            <h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                vitae augue lacinia, scelerisque sem in, condimentum ipsum.
                Vestibulum ullamcorper ex id commodo mattis. Mauris sollicitudin
                dignissim tortor in porta. Cras mollis lacus lectus. Sed
                pulvinar in neque in ultricies.
            </h3> */}

            <section class="text-gray-400 bg-gray-900 body-font">
                <div class="container px-5 py-10 mx-auto">
                    <div class="flex flex-col text-center w-full mb-10">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                            Transfer Options Available
                        </h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Use Playlist Transfer App to move Playlists across
                            below listed music services.
                        </p>
                    </div>
                    <div class="flex flex-wrap -m-2">
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <span class="flex justify-center items-center">
                                    <SpotifyLogo /> &nbsp; &nbsp;
                                    <YoutubeMusicLogo />
                                </span>
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">
                                        Spotify to Youtube Music
                                    </h2>
                                    <a
                                        href="test"
                                        class="text-indigo-400 inline-flex items-center"
                                    >
                                        Transfer
                                        <svg
                                            class="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <span class="flex justify-center items-center">
                                    <SpotifyLogo /> &nbsp; &nbsp;
                                    <AppleMusicLogo />
                                </span>
                                <div class="flex-grow">
                                    <h2>Coming Soon</h2>
                                    <h2 class="text-black title-font font-medium">
                                        Spotify to Apple Music
                                    </h2>
                                    <a class="text-black inline-flex items-center">
                                        Transfer
                                        <svg
                                            class="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <span class="flex justify-center items-center">
                                    <SpotifyLogo /> &nbsp; &nbsp;
                                    <DeezerLogo />
                                </span>
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">
                                        Spotify to Deezer
                                    </h2>
                                    <Link
                                        to="ListSpotifyPlaylists/toDeezer"
                                        class="text-indigo-400 inline-flex items-center"
                                    >
                                        Transfer
                                        <svg
                                            class="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <span class="flex justify-center items-center">
                                    <YoutubeMusicLogo /> &nbsp; &nbsp;
                                    <SpotifyLogo />
                                </span>
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">
                                        Youtube Music to Spotify
                                    </h2>
                                    <Link
                                        to="ListYoutubeMusicPlaylists/toSpotify"
                                        class="text-indigo-400 inline-flex items-center"
                                    >
                                        Transfer
                                        <svg
                                            class="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <span class="flex justify-center items-center">
                                    <YoutubeMusicLogo /> &nbsp; &nbsp;
                                    <AppleMusicLogo />
                                </span>
                                <div class="flex-grow">
                                    <h2>Coming Soon</h2>
                                    <h2 class="text-black title-font font-medium">
                                        Youtube Music to Apple Music
                                    </h2>
                                    <a class="text-black inline-flex items-center">
                                        Transfer
                                        <svg
                                            class="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <span class="flex justify-center items-center">
                                    <YoutubeMusicLogo /> &nbsp; &nbsp;
                                    <DeezerLogo />
                                </span>
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">
                                        Youtube Music to Deezer
                                    </h2>
                                    <a
                                        href="test"
                                        class="text-indigo-400 inline-flex items-center"
                                    >
                                        Transfer
                                        <svg
                                            class="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Apple Music section is disbaled  */}

                        {/* <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <span class="flex justify-center items-center">
                                    <AppleMusicLogo /> &nbsp; &nbsp;
                                    <SpotifyLogo />
                                </span>
                                <div class="flex-grow">
                                    <h2 class="title-font font-medium text-black">
                                        Apple Music to Spotify
                                    </h2>
                                    <a class="text-black inline-flex items-center">
                                        Transfer
                                        <svg
                                            class="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <span class="flex justify-center items-center">
                                    <AppleMusicLogo /> &nbsp; &nbsp;
                                    <YoutubeMusicLogo />
                                </span>
                                <div class="flex-grow">
                                    <h2 class="text-black title-font font-medium">
                                        Apple Music to Youtube Music
                                    </h2>
                                    <a class="text-black inline-flex items-center">
                                        Transfer
                                        <svg
                                            class="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <span class="flex justify-center items-center">
                                    <AppleMusicLogo /> &nbsp; &nbsp;
                                    <DeezerLogo />
                                </span>
                                <div class="flex-grow">
                                    <h2 class="text-black title-font font-medium">
                                        Apple Music to Deezer
                                    </h2>
                                    <a class="text-black inline-flex items-center">
                                        Transfer
                                        <svg
                                            class="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div> */}

                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <span class="flex justify-center items-center">
                                    <DeezerLogo /> &nbsp; &nbsp;
                                    <SpotifyLogo />
                                </span>
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">
                                        Deezer to Spotify
                                    </h2>
                                    <Link
                                        to="ListDeezerPlaylists/toSpotify"
                                        class="text-indigo-400 inline-flex items-center"
                                    >
                                        Transfer
                                        <svg
                                            class="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <span class="flex justify-center items-center">
                                    <DeezerLogo /> &nbsp; &nbsp;
                                    <AppleMusicLogo />
                                </span>
                                <div class="flex-grow">
                                    <h2>Coming Soon</h2>
                                    <h2 class="text-black title-font font-medium">
                                        Deezer to Apple Music
                                    </h2>
                                    <a class="text-black inline-flex items-center">
                                        Transfer
                                        <svg
                                            class="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div class="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                                <span class="flex justify-center items-center">
                                    <DeezerLogo /> &nbsp; &nbsp;
                                    <YoutubeMusicLogo />
                                </span>
                                <div class="flex-grow">
                                    <h2 class="text-white title-font font-medium">
                                        Deezer to Youtube Music
                                    </h2>
                                    <a
                                        href="test"
                                        class="text-indigo-400 inline-flex items-center"
                                    >
                                        Transfer
                                        <svg
                                            class="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeBody;
