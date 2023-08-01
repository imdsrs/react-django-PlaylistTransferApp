// import React, { useEffect } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

const LoginYoutubeMusic = () => {
    // function handleCallbackResponse(response) {
    //     console.log(response);
    // }

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
    return (
        // <div id="signInDiv">
        //     <h1> test </h1>
        // </div>
        <div>
            <LoginSocialGoogle
                client_id={
                    "515720033979-c374rl8jubtear7c8g3jel8gg2965vib.apps.googleusercontent.com"
                }
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                    console.log(provider, data);
                }}
                onReject={(err) => {
                    console.log(err);
                }}
            >
                <GoogleLoginButton />
            </LoginSocialGoogle>
        </div>
    );
};

export default LoginYoutubeMusic;
