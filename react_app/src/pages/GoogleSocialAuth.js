import React, { Component } from "react";
import GoogleLogin from "@leecheuk/react-google-login";
import googleLogin from "./googleLogin";

class GoogleSocialAuth extends Component {
    render() {
        const responseGoogle = async (response) => {
            console.log(response);
            let googleResponse = await googleLogin(response.accessToken);
            console.log(googleResponse);
            console.log(response);
        };
        return (
            <div className="App">
                <h1>LOGIN WITH googles</h1>

                <GoogleLogin
                    clientId="515720033979-c374rl8jubtear7c8g3jel8gg2965vib.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
            </div>
        );
    }
}

export default GoogleSocialAuth;
