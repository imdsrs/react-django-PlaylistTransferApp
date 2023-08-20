import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    DEEZER_APPLICATION_ID,
    DEEZER_CLIENT_SECRET,
} from "../auth/DeezerAuth.js";

const DeezerSuccess = () => {
    const [deezerToken, setDeezerToken] = useState("");
    const [user, setUser] = useState({});

    const getAccessToken = async (code) => {
        // console.log("i'm here");
        var accessTokenValue = "";
        await axios(
            `https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/access_token.php?app_id=${DEEZER_APPLICATION_ID}&secret=${DEEZER_CLIENT_SECRET}&code=${code}&response_type=token&output=json`
        )
            .then((response) => {
                // console.log("response::", response.data);
                accessTokenValue = response.data.access_token;
                //console.log("response accessTokenValue::", response.data);
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
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setDeezerToken(localStorage.getItem("DeezerAccessToken"));
    }, [deezerToken]);

    useEffect(() => {
        // getting the Deezer code from received response
        const queryParameters = new URLSearchParams(window.location.search);
        const code = queryParameters.get("code");
        // console.log(code);
        getAccessToken(code);
    }, []);

    return (
        <div class="text-gray-400 bg-gray-900 body-font h-[66vh]">
            {console.log("user::", user)}
            {user.name && (
                <div className="justify-center items-center m-auto text-3xl text-orange-400 py-8">
                    Logged in Succesfully to Deezeer
                </div>
            )}
            {user.name && user.picture_small && (
                <div className="flex justify-center items-center m-auto py-8">
                    Deezer logged in as&nbsp;
                    <br />
                    {user.name}&nbsp;
                    <img
                        src={user.picture_small}
                        alt="profile"
                        className="rounded-3xl"
                    />
                </div>
            )}
        </div>
    );
};

export default DeezerSuccess;
