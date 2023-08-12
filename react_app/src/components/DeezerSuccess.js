import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    DEEZER_APPLICATION_ID,
    DEEZER_CLIENT_SECRET,
} from "../auth/DeezerAuth.js";

const DeezerSuccess = () => {
    const [deezerToken, setDeezerToken] = useState("");
    const [playlists, setPlaylists] = useState({});
    // const [artists, setArtists] = useState({});
    const [tracks, setTracks] = useState({});
    const [user, setUser] = useState({});
    const [playlistTracks, setPlaylistTracks] = useState({});

    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
    const TRACKS_ENDPOINT =
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=12";
    const ARTISTS_ENDPOINT =
        "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=12";
    const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

    const hearderValues = {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers":
            "X-Requested-With, Content-Type, Authorization, Origin, Accept, Accept-Encoding",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
        "Content-Type": "text/javascript; charset=utf-8",
    };

    const getAccessToken = async (code) => {
        // console.log("i'm here");
        var accessTokenValue = "";
        await axios(
            `https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/access_token.php?app_id=${DEEZER_APPLICATION_ID}&secret=${DEEZER_CLIENT_SECRET}&code=${code}&response_type=token&output=json`
        )
            .then((response) => {
                // console.log("response::", response.data);
                accessTokenValue = response.data.access_token;
                console.log("response accessTokenValue::", response.data);
                // console.log("i'm still inside undefied");
                localStorage.setItem(
                    "DeezerAccessToken",
                    response.data.access_token
                );
                setDeezerToken(response.data.access_token);
                document.cookie =
                    "DeezerAccessToken=" + response.data.access_token;
                fetchUserData(response.data.access_token, setUser);
            })
            .catch((error) => {
                console.log(error);
            });
        //window.location = `https://connect.deezer.com/oauth/access_token.php?app_id=${APPLICATION_ID}&secret=${CLIENT_SECRET}&code=${code}`;
    };
    const fetchPlaylistData = async (userId, deezerAccessTokenValue) => {
        var url = `https://api.deezer.com/user/${userId}/playlists`;
        await axios
            .get(
                `https://cors-anywhere.herokuapp.com/${url}?access_token=${deezerAccessTokenValue}`
            )
            .then((response) => {
                // console.log("fetchPlaylistData response::", response.data);
                setPlaylists(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fetchUserData = async (deezerAccessTokenValue) => {
        var url = "https://api.deezer.com/user/me";
        await axios
            .get(
                `https://cors-anywhere.herokuapp.com/${url}?access_token=${deezerAccessTokenValue}`
            )
            .then((response) => {
                // console.log("fetchUserData response::", response.data);
                setUser(response.data);
                // console.log("fetchUserData user response::", response.data.id);
                fetchPlaylistData(response.data.id, deezerAccessTokenValue);
            })
            .catch((error) => {
                console.log(error);
            });
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
                // console.log("response::", response.data);
            })
            .catch((error) => {
                // console.log("error::", error);
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
                // console.log(
                //     "playlist updating values here are::",
                //     response.data
                // );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setDeezerToken(localStorage.getItem("DeezerAccessToken"));
    }, [deezerToken]);

    useEffect(() => {
        // getting the Spotify token from the hash
        const queryParameters = new URLSearchParams(window.location.search);
        const code = queryParameters.get("code");
        // console.log(code);
        getAccessToken(code);
        var deezerAccessTokenValue = localStorage.getItem("DeezerAccessToken");
        // console.log("accessTokenValue", deezerAccessTokenValue);
        //window.history.pushState({}, null, "/DeezerSuccess");
        //fetchUserData(deezerAccessTokenValue);
        // window.history.pushState({}, null, "/home");
        // request to spotify api to fetch
        //getData(PLAYLISTS_ENDPOINT, setPlaylists);
        // getData(TRACKS_ENDPOINT, setTracks);
        // getData(ARTISTS_ENDPOINT, setArtists);
        //getData(PROFILE_ENDPOINT, setProfile);
    }, []);

    // useEffect(() => {
    //     playlists.items?.map((playlists, index) => {
    //         return getData(playlists.tracks.href, setPlaylistTracks);
    //     });
    //     // console.log("a::", a);
    //     console.log("playlists values being fetched");
    // }, [playlists]);

    return (
        <div>
            {console.log("user::", user)}
            {user.name && user.picture_small && (
                <div className="profile">
                    <img src={user.picture_small} alt="profile" />
                    <h1>Hello 👋, {user.name}!</h1>
                </div>
            )}

            {console.log("playlists::", playlists)}
            {playlists && playlists.data && (
                <div className="playlists">
                    <h1>Your playlists:</h1>
                    <div
                        style={{
                            display: "grid",
                            // gridTemplateColumns: "auto auto auto auto",
                        }}
                    >
                        {playlists.data.map((playlists, index) => {
                            return (
                                <div>
                                    <div
                                        key={index}
                                        className="playlists"
                                        style={{
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        <img
                                            src={playlists.picture}
                                            alt="profile"
                                            height="5%"
                                            width="5%"
                                        />
                                        <h2>
                                            Tracks in {playlists.title} are:{" "}
                                        </h2>
                                        <h3>By {playlists.link}</h3>
                                    </div>
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

export default DeezerSuccess;
