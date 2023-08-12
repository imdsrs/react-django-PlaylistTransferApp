// import React, { useEffect } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import GoogleSocialAuth from "../pages/GoogleSocialAuth";
import "../App.css";
import axios from "axios";
import { ReactComponent as YoutubeMusicLogo96px } from "../assets/youtubeMusicLogo_96px.svg";

const handleCallbackResponse = async (response) => {
    // console.log("hello::", response);
    let res = await axios.post(
        "http://127.0.0.1:8000/hello/rest-auth/google/",
        {
            access_token: response.accesstoken,
        }
    );
    console.log(res);
    return await res.status;
};

const LoginYoutubeMusic = () => {
    // useEffect(() => {
    //     /* global google */
    //     google.accounts.id.initialize({
    //         client_id: "",
    //         callback: handleCallbackResponse,
    //     });
    //     try {
    //         google.account.id.renderButton(
    //             document.getElementById("signInDiv"),
    //             {
    //                 theme: "outline",
    //                 size: "large",
    //             }
    //         );
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, []);
    //const myHTML = `{% load socialaccount %}`;

    let handleCallbackResponseTry2 = async (response) => {
        await fetch(`http://127.0.0.1:8000/rest-auth/google/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // access_token: response.accesstoken,
            body: JSON.stringify(response),
        });
    };
    return (
        <div class="text-gray-400 bg-gray-900 body-font h-[65vh]">
            <br />
            <span class="flex justify-center items-center">
                <YoutubeMusicLogo96px />
                <div className="text-center px-10 py-5 text-4xl">
                    Youtube Music
                </div>
            </span>
            <br />
            <br />
            <br />
            <span className="flex flex-col text-center items-center">
                <LoginSocialGoogle
                    client_id={
                        "515720033979-c374rl8jubtear7c8g3jel8gg2965vib.apps.googleusercontent.com"
                    }
                    scope="https://www.googleapis.com/auth/youtube.readonly"
                    discoveryDocs="claims_supported"
                    access_type="offline"
                    typeResponse="accessToken"
                    onResolve={({ provider, data }) => {
                        console.log(provider, data);
                        // console.log(handleCallbackResponse(data));
                        handleCallbackResponseTry2(data);
                    }}
                    onReject={(err) => {
                        console.log(err);
                    }}
                >
                    <div className="py-5">
                        <GoogleLoginButton />
                    </div>
                </LoginSocialGoogle>
            </span>
        </div>
    );
};

export default LoginYoutubeMusic;
