import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SpotifySuccess = () => {
    const [spotifyToken, setSpotifyToken] = useState("");
    const [playlists, setPlaylists] = useState({});
    const [artists, setArtists] = useState({});
    const [tracks, setTracks] = useState({});
    const [profile, setProfile] = useState({});
    const [playlistTracks, setPlaylistTracks] = useState({});

    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
    const TRACKS_ENDPOINT =
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=12";
    const ARTISTS_ENDPOINT =
        "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=12";
    const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

    const getParamsFromHash = (hash) => {
        const hashContent = hash.substr(1); // removes #
        const paramsSplit = hashContent.split("&"); // returns list with keys and values
        let params = {}; // fill with params
        let values = []; // use in foreach loop to store split return values
        paramsSplit.forEach((item) => {
            values = item.split("=");
            params[values[0]] = values[1];
            console.log("item", item);
        });
        return params;
    };

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
                console.log("response::", response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDataWo = async (endpoint) => {
        await axios
            .get(endpoint, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "SpotifyToken"
                    )}`, // pass token to header
                },
            })
            .then((response) => {
                // setFunction(response.data);
                console.log(
                    "playlist updating values here are::",
                    response.data
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setSpotifyToken(localStorage.getItem("SpotifyToken"));
    }, [spotifyToken]);

    useEffect(() => {
        // getting the Spotify token from the hash
        console.log("use effect::::");
        if (window.location.hash || spotifyToken) {
            const hash = window.location.hash;
            const spotifyTokens = getParamsFromHash(hash);
            if (!spotifyToken) {
                setSpotifyToken(spotifyTokens.token);
                localStorage.setItem(
                    "SpotifyToken",
                    spotifyTokens.access_token
                );
                document.cookie =
                    "SpotifyAccessToken=" + spotifyTokens.access_token;
            }
            window.history.pushState({}, null, "/SpotifySuccess");
        }
        // request to spotify api to fetch
        getData(PLAYLISTS_ENDPOINT, setPlaylists);
        // getData(TRACKS_ENDPOINT, setTracks);
        // getData(ARTISTS_ENDPOINT, setArtists);
        getData(PROFILE_ENDPOINT, setProfile);
    }, []);

    useEffect(() => {
        playlists.items?.map((playlists, index) => {
            return getData(playlists.tracks.href, setPlaylistTracks);
        });
        // console.log("a::", a);
        console.log("playlists values being fetched");
    }, [playlists]);

    return (
        <div class="text-gray-400 bg-gray-900 body-font h-[66vh]">
            {console.log("profile::", profile)}
            {profile && (
                <div className="justify-center items-center m-auto text-3xl text-green-400 py-8">
                    Logged in Succesfully to Spotify
                </div>
            )}
            {profile.display_name &&
                profile.images &&
                profile.images[0].url && (
                    <div className="flex justify-center items-center m-auto py-8">
                        Spotify logged in as&nbsp;
                        <br />
                        {profile.display_name}&nbsp;
                        <img
                            src={profile.images[0].url}
                            alt="profile"
                            className="rounded-3xl"
                        />
                    </div>
                )}
            {/* {tracks.items && (
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
            )} */}
            {/* {console.log("playlists", playlists)}
            {playlists.items && (
                <div className="playlists mt-10">
                    <h1>Your playlists are:</h1>
                    <div className="mt-12">
                        {playlists.items.map((playlists, index) => {
                            return (
                                <div>
                                    <div
                                        key={index}
                                        className="playlists w-full text-center"
                                    >
                                        <span className="flex items-center justify-center">
                                            {playlists.images[0] && (
                                                <img
                                                    src={
                                                        playlists.images[0].url
                                                    }
                                                    alt="profile"
                                                    // height="5%"
                                                    // width="5%"
                                                    className="w-[5%] h-[5%] rounded-3xl"
                                                />
                                            )}{" "}
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
                                            </span>
                                        </span>
                                        <span>
                                            <a
                                                href={
                                                    playlists.external_urls
                                                        .spotify
                                                }
                                                className="text-blue-300"
                                            >
                                                Open Playlist on Spotify
                                            </a>
                                            &nbsp;&nbsp;&nbsp;
                                            <Link to="">Transfer to </Link>
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
            )} */}
        </div>
    );
};

export default SpotifySuccess;
