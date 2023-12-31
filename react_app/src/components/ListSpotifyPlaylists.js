import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ListSpotifyPlaylists = () => {
    const { destinationValue } = useParams();

    const [profile, setProfile] = useState({});
    const [playlists, setPlaylists] = useState({});

    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
    const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

    // function to request data from spotify api
    const getData = async (endpoint, setFunction) => {
        await axios
            .get(endpoint, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "SpotifyToken"
                    )}`, // pass Spotify token to header
                },
            })
            .then((response) => {
                setFunction(response.data);
                // console.log("response::", response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        // alert("hello");
        getData(PROFILE_ENDPOINT, setProfile);
        getData(PLAYLISTS_ENDPOINT, setPlaylists);
    }, []);

    return (
        <div class="text-gray-400 bg-gray-900 body-font">
            {/* <h1>{destinationValue}</h1> */}
            {/* {console.log("profile::", profile)} */}
            {profile.display_name && (
                <div className="flex justify-end items-end text-sm">
                    Spotify logged in as&nbsp;
                    <br />
                    {profile.images &&
                        profile.images.length > 0 &&
                        profile.images[0].url && (
                            <img
                                src={profile.images[0].url}
                                alt="profile"
                                className="rounded-3xl"
                            />
                        )}
                </div>
            )}

            {/* {console.log("playlists", playlists)} */}
            {playlists.items && (
                <div className="playlists mt-10">
                    <span className="text-4xl">Your playlists are:</span>
                    <div className="mt-12">
                        {playlists.items.map((playlists, index) => {
                            return (
                                <div>
                                    <div
                                        key={index}
                                        className="playlists w-full text-center"
                                    >
                                        <span className="flex items-center justify-center">
                                            {playlists.images.map(
                                                (currimage, index) => {
                                                    return (
                                                        index === 0 && (
                                                            <img
                                                                src={
                                                                    currimage.url
                                                                }
                                                                alt="profile"
                                                                className="w-[5%] h-[5%] rounded-3xl"
                                                            />
                                                        )
                                                    );
                                                }
                                            )}
                                            &nbsp;&nbsp;
                                            <span className="text-lg">
                                                {playlists.name} by{" "}
                                                {playlists.owner.display_name}
                                                {playlists.description && (
                                                    <div className="flex justify-center items-center">
                                                        <span className="text-xs">
                                                            {
                                                                playlists.description
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex justify-center items-center">
                                                    <span className="text-xs underline">
                                                        Tracks Available:&nbsp;
                                                        {playlists.tracks.total}
                                                    </span>
                                                </div>
                                            </span>
                                        </span>
                                        <span>
                                            <a
                                                href={
                                                    playlists.external_urls
                                                        .spotify
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-300"
                                            >
                                                Open Playlist on Spotify
                                            </a>
                                            &nbsp;&nbsp;&nbsp;
                                            {playlists.tracks.total !== 0 && (
                                                <Link
                                                    to={`/TransferFromSpotify/${destinationValue}/${playlists.id}`}
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
                                            {playlists.tracks.total === 0 &&
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

export default ListSpotifyPlaylists;
