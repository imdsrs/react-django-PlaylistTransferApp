// import React, { useEffect } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import GoogleSocialAuth from "../pages/GoogleSocialAuth";
import "../App.css";
import axios from "axios";

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
        // <div id="signInDiv">
        //     <h1> test </h1>
        // </div>
        // <div dangerouslySetInnerHTML={{ __html: myHTML }}>
        <div>
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
                <h2>hello</h2>
                <div className="py-5">
                    <GoogleLoginButton
                        style={{ width: "calc(50%)" }}
                        // className="test"
                    />
                </div>
            </LoginSocialGoogle>
            {/* {% load socialaccount %} */}
            {/* {test1}
            <h2>google login</h2>
            <a href="{% provider_login_url 'google' %}?next=/">
                Login with Google
            </a> */}
            {/* <GoogleSocialAuth /> */}
        </div>
    );
};

export default LoginYoutubeMusic;
