import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ListDeezerPlaylists = () => {
    const { destinationValue } = useParams();

    const [deezerToken, setDeezerToken] = useState("");
    const [playlists, setPlaylists] = useState({});
    const [user, setUser] = useState({});

    const DEEZER_ENDPOINT =
        "https://cors-anywhere.herokuapp.com/https://api.deezer.com/user/";

    const fetchUserData = async (dezTok) => {
        // setDeezerToken(localStorage.getItem("DeezerAccessToken"));
        var deezerAccessTokenValue = localStorage.getItem("DeezerAccessToken");
        await axios
            .get(`${DEEZER_ENDPOINT}me?access_token=${deezerAccessTokenValue}`)
            .then((response) => {
                setUser(response.data);
                fetchPlaylistData(response.data.id, deezerAccessTokenValue);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fetchPlaylistData = async (userId, deezerAccessTokenValue) => {
        await axios
            .get(
                `${DEEZER_ENDPOINT}${userId}/playlists` //?access_token=${deezerAccessTokenValue}`
            )
            .then((response) => {
                // console.log("fetchPlaylistData response::", response.data);
                setPlaylists(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setDeezerToken(localStorage.getItem("DeezerAccessToken"));
        fetchUserData();
    }, []);

    return (
        <div class="text-gray-400 bg-gray-900 body-font">
            {/* <h1>{destinationValue}</h1> */}
            {/* {console.log("user::", user)} */}
            {user.name && user.picture_small && (
                <div className="flex justify-end items-end text-sm">
                    Deezer logged in as&nbsp;
                    <br />
                    {user.name}&nbsp;
                    <img
                        src={user.picture_small}
                        alt="profile"
                        className="rounded-full h-10 w-10"
                    />
                </div>
            )}

            {/* {console.log("playlists::", playlists)} */}
            {playlists && playlists.data && (
                <div className="playlists mt-10">
                    <span className="text-4xl">Your playlists are:</span>
                    <div className="mt-12">
                        {playlists.data.map((playlists, index) => {
                            return (
                                <div>
                                    <div
                                        key={index}
                                        className="playlists w-full text-center"
                                    >
                                        <span className="flex items-center justify-center">
                                            <img
                                                src={playlists.picture}
                                                alt="profile"
                                                // height="5%"
                                                // width="5%"
                                                className="w-[5%] h-[5%] rounded-3xl"
                                            />
                                            &nbsp;&nbsp;
                                            {/* <h2>
                                                Tracks in {playlists.title} are:{" "}
                                            </h2>
                                            <h3>By {playlists.link}</h3> */}
                                            <span className="text-lg">
                                                {playlists.title} by{" "}
                                                {playlists.creator.name}
                                                {/* {playlists.nb_tracks !== 0 && ( */}
                                                <div className="flex justify-center items-center">
                                                    <span className="text-xs underline">
                                                        Tracks Available:&nbsp;
                                                        {playlists.nb_tracks}
                                                    </span>
                                                </div>
                                                {/* )} */}
                                            </span>
                                        </span>
                                        <span>
                                            <a
                                                href={playlists.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-300"
                                            >
                                                Open Playlist on Deezer
                                            </a>
                                            &nbsp;&nbsp;&nbsp;
                                            {playlists.nb_tracks !== 0 && (
                                                <Link
                                                    to={`/TransferFromDeezer/${destinationValue}/${playlists.id}`}
                                                    class="text-indigo-400"
                                                >
                                                    Transfer to&nbsp;
                                                    {destinationValue ===
                                                    "toDeezer"
                                                        ? "Deezer"
                                                        : destinationValue ===
                                                          "toYoutubeMusic"
                                                        ? "Youtube Music"
                                                        : destinationValue ===
                                                          "toSpotify"
                                                        ? "Spotify"
                                                        : destinationValue ===
                                                          "toAppleMusic"
                                                        ? "Apple Music"
                                                        : "NO OPTION"}
                                                </Link>
                                            )}
                                            {playlists.nb_tracks === 0 &&
                                                "No Tracks to Transfer"}
                                        </span>
                                    </div>
                                    <br />
                                    <hr className="w-1/2 m-auto	" />
                                    <br />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListDeezerPlaylists;
