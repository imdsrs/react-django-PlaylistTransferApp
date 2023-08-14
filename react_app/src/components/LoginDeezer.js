import React from "react";
import { ReactComponent as DeezerLogo96px } from "../assets/deezerLogo_96px.svg";

const LoginDeezer = (props) => {
    return (
        <div>
            <div class="text-gray-400 bg-gray-900 body-font h-[66vh]">
                <br />
                <span class="flex justify-center items-center">
                    <DeezerLogo96px />
                    <div className="text-center px-10 py-5 text-4xl">
                        Deezer
                    </div>
                </span>
                <br />
                <br />
                <br />
                <br />
                <span class="">
                    <button
                        className="bg-orange-400 text-white rounded-2xl px-4 py-4"
                        onClick={() => props.handleLogin()}
                    >
                        Login with Deezer
                    </button>
                </span>
            </div>
        </div>
    );
};

export default LoginDeezer;
