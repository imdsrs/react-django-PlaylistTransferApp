import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ListSpotifyPlaylists = () => {
    const { destinationValue } = useParams();

    const [profile, setProfile] = useState({});
    const [playlists, setPlaylists] = useState({});
    const [tracks, setTracks] = useState({});

    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
    const TRACKS_IN_PLAYLIST_ENDPOINT =
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=12";
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
        getData(PLAYLISTS_ENDPOINT, setPlaylists);
        getData(PROFILE_ENDPOINT, setProfile);
    }, []);

    return (
        <div class="text-gray-400 bg-gray-900 body-font">
            {/* <h1>{destinationValue}</h1> */}
            {console.log("profile::", profile)}
            {profile.display_name &&
                profile.images &&
                profile.images[0].url && (
                    <div className="flex justify-end items-end text-sm">
                        Spotify logged in as&nbsp;
                        <br />
                        {profile.display_name}&nbsp;
                        <img
                            src={profile.images[0].url}
                            alt="profile"
                            className="rounded-full h-10 w-10"
                        />
                    </div>
                )}
            {tracks.items && (
                <div className="list">
                    <h1>Your top tracks</h1>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "auto auto auto auto",
                        }}
                    >
                        {tracks.items.map((track, index) => {
                            return (
                                <div
                                    key={index}
                                    className="track"
                                    style={{
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                >
                                    <img
                                        src={track.album.images[0].url}
                                        alt="profile"
                                    />
                                    <h2>{track.name}</h2>
                                    <h3>By {track.artists[0].name}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {console.log("playlists", playlists)}
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
                                            <img
                                                src={playlists.images[0].url}
                                                alt="profile"
                                                // height="5%"
                                                // width="5%"
                                                className="w-[5%] h-[5%] rounded-3xl"
                                            />
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
                                                {playlists.tracks.total && (
                                                    <div className="flex justify-center items-center">
                                                        <span className="text-xs underline">
                                                            Tracks
                                                            Available:&nbsp;
                                                            {
                                                                playlists.tracks
                                                                    .total
                                                            }
                                                        </span>
                                                    </div>
                                                )}
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
                                            <Link
                                                to={`/TransferFromSpotify/${destinationValue}/${playlists.id}`}
                                                class="text-indigo-400"
                                            >
                                                Transfer to&nbsp;
                                                {destinationValue === "toDeezer"
                                                    ? "Deezer"
                                                    : destinationValue ===
                                                      "toYoutube"
                                                    ? "Youtube Music"
                                                    : "Apple Music"}
                                            </Link>
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
