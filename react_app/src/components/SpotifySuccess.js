import React, { useEffect, useState } from "react";
import axios from "axios";

const SpotifySuccess = () => {
    const [spotifyToken, setSpotifyToken] = useState("");
    const [profile, setProfile] = useState({});

    const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

    const getParamsFromHash = (hash) => {
        const hashContent = hash.substr(1); // removes #
        const paramsSplit = hashContent.split("&"); // returns list with keys and values
        let params = {}; // fill with params
        let values = []; // use in foreach loop to store split return values
        paramsSplit.forEach((item) => {
            values = item.split("=");
            params[values[0]] = values[1];
            // console.log("item", item);
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
                // console.log("response::", response.data);
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
        // console.log("use effect::::");
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
        getData(PROFILE_ENDPOINT, setProfile);
    }, []);

    return (
        <div class="text-gray-400 bg-gray-900 body-font h-[66vh]">
            {/* {console.log("profile::", profile)} */}
            {profile && (
                <div className="justify-center items-center m-auto text-3xl text-green-400 py-8">
                    Logged in Succesfully to Spotify
                </div>
            )}
            {profile.display_name && (
                <div className="flex justify-center items-center m-auto py-8">
                    Spotify logged in as&nbsp;
                    <br />
                    {profile.display_name}&nbsp;
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
        </div>
    );
};

export default SpotifySuccess;
